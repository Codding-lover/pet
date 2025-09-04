import type { Express } from "express";
import { createServer, type Server } from "http";
import session from 'express-session';
import multer from 'multer';
import path from 'path';
import { storage } from "./storage";
import { hashPassword, verifyPassword, requireAuth, requireAdmin, createDefaultAdmin } from "./auth";
import { insertUserSchema, insertPostSchema, insertCategorySchema, insertTestimonialSchema, insertSettingSchema, insertNavigationSchema, insertElementSchema, insertPageSchema } from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Create default admin on startup
  await createDefaultAdmin();

  // Auth Routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Set session
      req.session.userId = user.id;
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined
      };

      res.json({ 
        success: true, 
        user: req.session.user 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ success: true });
    });
  });

  app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({ user: req.session.user });
  });

  // User Management Routes
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const users = await storage.getUsers();
      // Remove passwords from response
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.post('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      userData.password = await hashPassword(userData.password);
      
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  });

  // Post Management Routes
  app.get('/api/admin/posts', requireAuth, async (req, res) => {
    try {
      const { status, type } = req.query;
      const posts = await storage.getPosts(
        status as string, 
        type as string
      );
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.get('/api/admin/posts/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });

  app.post('/api/admin/posts', requireAuth, async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      postData.authorId = req.session.userId;
      
      const post = await storage.createPost(postData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create post' });
    }
  });

  app.put('/api/admin/posts/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertPostSchema.partial().parse(req.body);
      
      const post = await storage.updatePost(id, updates);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update post' });
    }
  });

  app.delete('/api/admin/posts/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePost(id);
      if (!success) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });

  // Category Management Routes
  app.get('/api/admin/categories', requireAuth, async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  app.post('/api/admin/categories', requireAuth, async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create category' });
    }
  });

  // Testimonial Management Routes
  app.get('/api/admin/testimonials', requireAuth, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  app.post('/api/admin/testimonials', requireAuth, async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create testimonial' });
    }
  });

  app.put('/api/admin/testimonials/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertTestimonialSchema.partial().parse(req.body);
      
      const testimonial = await storage.updateTestimonial(id, updates);
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update testimonial' });
    }
  });

  app.delete('/api/admin/testimonials/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTestimonial(id);
      if (!success) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  });

  app.put('/api/admin/users/:id', requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const updates = insertUserSchema.partial().parse(req.body);
      if (updates.password) {
        updates.password = await hashPassword(updates.password);
      }
      
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  });

  app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      // Prevent deleting self
      if (id === req.session.userId) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }
      
      const success = await storage.deleteUser(id);
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  app.delete('/api/admin/media/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMediaFile(id);
      if (!success) {
        return res.status(404).json({ error: 'Media file not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete media file' });
    }
  });

  // Settings Management Routes
  app.get('/api/admin/settings', requireAuth, async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  app.post('/api/admin/settings', requireAuth, async (req, res) => {
    try {
      const settingData = insertSettingSchema.parse(req.body);
      const setting = await storage.setSetting(settingData);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update setting' });
    }
  });

  // Media Upload Routes
  app.post('/api/admin/media', requireAuth, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const mediaData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
        uploadedBy: req.session.userId,
        alt: req.body.alt || ''
      };

      const media = await storage.createMediaFile(mediaData);
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  app.get('/api/admin/media', requireAuth, async (req, res) => {
    try {
      const media = await storage.getMediaFiles();
      res.json(media);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch media' });
    }
  });

  // Navigation Management Routes
  app.get('/api/admin/navigation', requireAuth, async (req, res) => {
    try {
      const { location } = req.query;
      const navigation = await storage.getNavigation(location as string);
      res.json(navigation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch navigation' });
    }
  });

  app.post('/api/admin/navigation', requireAuth, async (req, res) => {
    try {
      const navData = insertNavigationSchema.parse(req.body);
      const navItem = await storage.createNavigationItem(navData);
      res.json(navItem);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create navigation item' });
    }
  });

  app.put('/api/admin/navigation/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertNavigationSchema.partial().parse(req.body);
      
      const navItem = await storage.updateNavigationItem(id, updates);
      if (!navItem) {
        return res.status(404).json({ error: 'Navigation item not found' });
      }
      res.json(navItem);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update navigation item' });
    }
  });

  app.delete('/api/admin/navigation/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteNavigationItem(id);
      if (!success) {
        return res.status(404).json({ error: 'Navigation item not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete navigation item' });
    }
  });

  // Element Management Routes (Header, Footer, Sections)
  app.get('/api/admin/elements', requireAuth, async (req, res) => {
    try {
      const { type } = req.query;
      const elements = await storage.getElements(type as string);
      res.json(elements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch elements' });
    }
  });

  app.get('/api/admin/elements/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const element = await storage.getElement(id);
      if (!element) {
        return res.status(404).json({ error: 'Element not found' });
      }
      res.json(element);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch element' });
    }
  });

  app.post('/api/admin/elements', requireAuth, async (req, res) => {
    try {
      const elementData = insertElementSchema.parse(req.body);
      const element = await storage.createElement(elementData);
      res.json(element);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create element' });
    }
  });

  app.put('/api/admin/elements/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertElementSchema.partial().parse(req.body);
      
      const element = await storage.updateElement(id, updates);
      if (!element) {
        return res.status(404).json({ error: 'Element not found' });
      }
      res.json(element);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update element' });
    }
  });

  app.delete('/api/admin/elements/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteElement(id);
      if (!success) {
        return res.status(404).json({ error: 'Element not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete element' });
    }
  });

  // Dynamic Page Management Routes
  app.get('/api/admin/pages', requireAuth, async (req, res) => {
    try {
      const { status } = req.query;
      const pages = await storage.getPages(status as string);
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pages' });
    }
  });

  app.get('/api/admin/pages/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const page = await storage.getPageById(id);
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch page' });
    }
  });

  app.post('/api/admin/pages', requireAuth, async (req, res) => {
    try {
      const pageData = insertPageSchema.parse(req.body);
      
      // If setting as home page, unset other home pages
      if (pageData.isHomePage) {
        const currentHomePage = await storage.getHomePage();
        if (currentHomePage) {
          await storage.updatePage(currentHomePage.id, { isHomePage: false });
        }
      }
      
      const page = await storage.createPage(pageData);
      res.json(page);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create page' });
    }
  });

  app.put('/api/admin/pages/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertPageSchema.partial().parse(req.body);
      
      // If setting as home page, unset other home pages
      if (updates.isHomePage) {
        const currentHomePage = await storage.getHomePage();
        if (currentHomePage && currentHomePage.id !== id) {
          await storage.updatePage(currentHomePage.id, { isHomePage: false });
        }
      }
      
      const page = await storage.updatePage(id, updates);
      if (!page) {
        return res.status(404).json({ error: 'Page not found' });
      }
      res.json(page);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update page' });
    }
  });

  app.delete('/api/admin/pages/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePage(id);
      if (!success) {
        return res.status(404).json({ error: 'Page not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete page' });
    }
  });

  // Public API Routes (for frontend)
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await storage.getPosts('published', 'post');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials(true);
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  app.get('/api/navigation', async (req, res) => {
    try {
      const { location } = req.query;
      const navigation = await storage.getNavigation(location as string);
      res.json(navigation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch navigation' });
    }
  });

  app.get('/api/elements', async (req, res) => {
    try {
      const { type } = req.query;
      const elements = await storage.getElements(type as string);
      res.json(elements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch elements' });
    }
  });

  app.get('/api/pages/home', async (req, res) => {
    try {
      const page = await storage.getHomePage();
      if (!page) {
        return res.status(404).json({ error: 'Home page not found' });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch home page' });
    }
  });

  app.get('/api/pages/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const page = await storage.getPageBySlug(slug);
      if (!page || page.status !== 'published') {
        return res.status(404).json({ error: 'Page not found' });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch page' });
    }
  });

  // Serve uploaded files
  app.use('/uploads', (await import('express')).static('uploads'));

  const httpServer = createServer(app);
  return httpServer;
}
