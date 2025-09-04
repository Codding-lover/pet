import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"), // admin, editor
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Posts table for articles and blog content
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  status: text("status").notNull().default("draft"), // draft, published, trash
  type: text("type").notNull().default("post"), // post, page
  featuredImage: text("featured_image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  authorId: varchar("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  publishedAt: timestamp("published_at"),
});

// Categories for organizing posts
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Post-Category relationships
export const postCategories = pgTable("post_categories", {
  id: serial("id").primaryKey(),
  postId: serial("post_id").references(() => posts.id),
  categoryId: serial("category_id").references(() => categories.id),
});

// Media library for uploaded files
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: serial("size").notNull(),
  url: text("url").notNull(),
  alt: text("alt"),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site settings
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  type: text("type").notNull().default("text"), // text, boolean, json, number
  group: text("group").notNull().default("general"), // general, appearance, seo
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials for the homepage
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dogName: text("dog_name").notNull(),
  dogAge: text("dog_age").notNull(),
  status: text("status").notNull(),
  statusColor: text("status_color").notNull(),
  image: text("image").notNull(),
  quote: text("quote").notNull(),
  isActive: boolean("is_active").default(true),
  order: serial("order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Navigation menu items
export const navigation = pgTable("navigation", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  target: text("target").default("_self"), // _self, _blank
  order: serial("order"),
  parentId: serial("parent_id"),
  isActive: boolean("is_active").default(true),
  location: text("location").notNull().default("header"), // header, footer
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Website elements (header, footer, sections)
export const elements = pgTable("elements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Header, Footer, Hero Section, etc.
  type: text("type").notNull(), // header, footer, section, component
  slug: text("slug").notNull().unique(),
  content: jsonb("content").notNull(), // Stores element structure and styling
  isActive: boolean("is_active").default(true),
  order: serial("order"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Dynamic pages with drag-drop layout
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content"), // CKEditor content
  layout: jsonb("layout"), // Drag-drop layout data
  status: text("status").notNull().default("draft"), // draft, published
  isHomePage: boolean("is_home_page").default(false),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  template: text("template").default("default"), // default, landing, blog
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  publishedAt: timestamp("published_at"),
});

// Schema validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
  firstName: true,
  lastName: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNavigationSchema = createInsertSchema(navigation).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertElementSchema = createInsertSchema(elements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertNavigation = z.infer<typeof insertNavigationSchema>;
export type Navigation = typeof navigation.$inferSelect;
export type InsertElement = z.infer<typeof insertElementSchema>;
export type Element = typeof elements.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
