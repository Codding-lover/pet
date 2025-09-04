import { 
  users, posts, categories, media, settings, testimonials, navigation, elements, pages,
  type User, type InsertUser, type Post, type InsertPost,
  type Category, type InsertCategory, type Media, type InsertMedia,
  type Setting, type InsertSetting, type Testimonial, type InsertTestimonial,
  type Navigation, type InsertNavigation, type Element, type InsertElement,
  type Page, type InsertPage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  
  // Post operations
  getPosts(status?: string, type?: string): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, updates: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, updates: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Media operations
  getMediaFiles(): Promise<Media[]>;
  getMediaFile(id: number): Promise<Media | undefined>;
  createMediaFile(media: InsertMedia): Promise<Media>;
  deleteMediaFile(id: number): Promise<boolean>;
  
  // Settings operations
  getSettings(): Promise<Setting[]>;
  getSetting(key: string): Promise<Setting | undefined>;
  setSetting(setting: InsertSetting): Promise<Setting>;
  
  // Testimonial operations
  getTestimonials(activeOnly?: boolean): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, updates: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Navigation operations
  getNavigation(location?: string): Promise<Navigation[]>;
  getNavigationItem(id: number): Promise<Navigation | undefined>;
  createNavigationItem(navigation: InsertNavigation): Promise<Navigation>;
  updateNavigationItem(id: number, updates: Partial<InsertNavigation>): Promise<Navigation | undefined>;
  deleteNavigationItem(id: number): Promise<boolean>;
  
  // Element operations
  getElements(type?: string): Promise<Element[]>;
  getElement(id: number): Promise<Element | undefined>;
  getElementBySlug(slug: string): Promise<Element | undefined>;
  createElement(element: InsertElement): Promise<Element>;
  updateElement(id: number, updates: Partial<InsertElement>): Promise<Element | undefined>;
  deleteElement(id: number): Promise<boolean>;
  
  // Page operations
  getPages(status?: string): Promise<Page[]>;
  getPageById(id: number): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getHomePage(): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, updates: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Post operations
  async getPosts(status?: string, type?: string): Promise<Post[]> {
    let query = db.select().from(posts);
    const conditions = [];
    
    if (status) conditions.push(eq(posts.status, status));
    if (type) conditions.push(eq(posts.type, type));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async updatePost(id: number, updates: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  async updateCategory(id: number, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const [category] = await db
      .update(categories)
      .set(updates)
      .where(eq(categories.id, id))
      .returning();
    return category;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Media operations
  async getMediaFiles(): Promise<Media[]> {
    return db.select().from(media).orderBy(desc(media.createdAt));
  }

  async getMediaFile(id: number): Promise<Media | undefined> {
    const [file] = await db.select().from(media).where(eq(media.id, id));
    return file;
  }

  async createMediaFile(insertMedia: InsertMedia): Promise<Media> {
    const [file] = await db.insert(media).values(insertMedia).returning();
    return file;
  }

  async deleteMediaFile(id: number): Promise<boolean> {
    const result = await db.delete(media).where(eq(media.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Settings operations
  async getSettings(): Promise<Setting[]> {
    return db.select().from(settings).orderBy(settings.group, settings.key);
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async setSetting(insertSetting: InsertSetting): Promise<Setting> {
    const [setting] = await db
      .insert(settings)
      .values(insertSetting)
      .onConflictDoUpdate({
        target: settings.key,
        set: { ...insertSetting, updatedAt: new Date() }
      })
      .returning();
    return setting;
  }

  // Testimonial operations
  async getTestimonials(activeOnly = false): Promise<Testimonial[]> {
    let query = db.select().from(testimonials);
    
    if (activeOnly) {
      query = query.where(eq(testimonials.isActive, true));
    }
    
    return await query.orderBy(testimonials.order, desc(testimonials.createdAt));
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async updateTestimonial(id: number, updates: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Navigation operations
  async getNavigation(location?: string): Promise<Navigation[]> {
    const conditions = [eq(navigation.isActive, true)];
    
    if (location) {
      conditions.push(eq(navigation.location, location));
    }
    
    return await db.select().from(navigation)
      .where(and(...conditions))
      .orderBy(navigation.order);
  }

  async getNavigationItem(id: number): Promise<Navigation | undefined> {
    const [item] = await db.select().from(navigation).where(eq(navigation.id, id));
    return item;
  }

  async createNavigationItem(insertNavigation: InsertNavigation): Promise<Navigation> {
    const [item] = await db.insert(navigation).values(insertNavigation).returning();
    return item;
  }

  async updateNavigationItem(id: number, updates: Partial<InsertNavigation>): Promise<Navigation | undefined> {
    const [item] = await db
      .update(navigation)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(navigation.id, id))
      .returning();
    return item;
  }

  async deleteNavigationItem(id: number): Promise<boolean> {
    const result = await db.delete(navigation).where(eq(navigation.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Element operations
  async getElements(type?: string): Promise<Element[]> {
    const conditions = [eq(elements.isActive, true)];
    
    if (type) {
      conditions.push(eq(elements.type, type));
    }
    
    return await db.select().from(elements)
      .where(and(...conditions))
      .orderBy(elements.order);
  }

  async getElement(id: number): Promise<Element | undefined> {
    const [element] = await db.select().from(elements).where(eq(elements.id, id));
    return element;
  }

  async getElementBySlug(slug: string): Promise<Element | undefined> {
    const [element] = await db.select().from(elements).where(eq(elements.slug, slug));
    return element;
  }

  async createElement(insertElement: InsertElement): Promise<Element> {
    const [element] = await db.insert(elements).values(insertElement).returning();
    return element;
  }

  async updateElement(id: number, updates: Partial<InsertElement>): Promise<Element | undefined> {
    const [element] = await db
      .update(elements)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(elements.id, id))
      .returning();
    return element;
  }

  async deleteElement(id: number): Promise<boolean> {
    const result = await db.delete(elements).where(eq(elements.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Page operations
  async getPages(status?: string): Promise<Page[]> {
    let query = db.select().from(pages);
    
    if (status) {
      query = query.where(eq(pages.status, status));
    }
    
    return await query.orderBy(desc(pages.updatedAt));
  }

  async getPageById(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async getHomePage(): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.isHomePage, true));
    return page;
  }

  async createPage(insertPage: InsertPage): Promise<Page> {
    const [page] = await db.insert(pages).values(insertPage).returning();
    return page;
  }

  async updatePage(id: number, updates: Partial<InsertPage>): Promise<Page | undefined> {
    const [page] = await db
      .update(pages)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return page;
  }

  async deletePage(id: number): Promise<boolean> {
    const result = await db.delete(pages).where(eq(pages.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
