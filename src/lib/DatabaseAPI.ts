import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export interface ImageMetadata {
  id: number;
  prompt: string;
  imageUrl: string;
  backblazeUrl: string;
  seed: number;
  width: number;
  height: number;
  contentType: string;
  hasNsfwConcepts: string;
  fullResult: string;
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  credits: number;
  membershipTier: string | null;
  membershipExpiry: number | null;
}

export class DatabaseAPI {
  private db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

  async initialize(): Promise<void> {
    if (this.db) return;

    const dbPath = path.join(process.cwd(), 'database.sqlite');
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        credits INTEGER DEFAULT 0,
        membershipTier TEXT,
        membershipExpiry INTEGER
      );

      CREATE TABLE IF NOT EXISTS image_metadata (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prompt TEXT,
        imageUrl TEXT,
        backblazeUrl TEXT,
        seed INTEGER,
        width INTEGER,
        height INTEGER,
        contentType TEXT,
        hasNsfwConcepts TEXT,
        fullResult TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        userId TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      );
    `);
  }

  async createUser(
    id: string,
    email: string,
    initialCredits: number,
  ): Promise<User> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      'INSERT INTO users (id, email, credits) VALUES (?, ?, ?)',
      [id, email, initialCredits],
    );

    const user = await this.getUserById(id);
    if (!user) throw new Error('Failed to create user');

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    const user = await this.db.get<User | undefined>(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );
    return user ?? null;
  }

  async getUserById(id: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    const user = await this.db.get<User | undefined>(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    return user ?? null;
  }

  async saveImageMetadata(
    data: Omit<ImageMetadata, 'id' | 'createdAt'>,
  ): Promise<ImageMetadata> {
    if (!this.db) throw new Error('Database not initialized');

    const { lastID } = await this.db.run(
      `INSERT INTO image_metadata (
        prompt, imageUrl, backblazeUrl, seed, width, height, contentType, hasNsfwConcepts, fullResult, userId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.prompt,
        data.imageUrl,
        data.backblazeUrl,
        data.seed,
        data.width,
        data.height,
        data.contentType,
        data.hasNsfwConcepts,
        data.fullResult,
        data.userId,
      ],
    ) as { lastID: number };

    const savedData = await this.db.get<ImageMetadata | undefined>(
      'SELECT * FROM image_metadata WHERE id = ?',
      [lastID],
    );
    if (!savedData) throw new Error('Failed to retrieve saved data');

    return savedData;
  }

  async getRecentImages(limit = 20): Promise<ImageMetadata[]> {
    if (!this.db) throw new Error('Database not initialized');

    const images = await this.db.all<ImageMetadata[]>(
      'SELECT * FROM image_metadata ORDER BY createdAt DESC LIMIT ?',
      [limit],
    );
    return images;
  }

  async getTotalImageCount(): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.get<{ count: number } | undefined>(
      'SELECT COUNT(*) as count FROM image_metadata',
    );
    return result?.count ?? 0;
  }

  async getUserCredits(userId: string): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.get<{ credits: number } | undefined>(
      'SELECT credits FROM users WHERE id = ?',
      [userId],
    );
    return result?.credits ?? 0;
  }

  async updateUserCredits(userId: string, creditChange: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      'UPDATE users SET credits = credits + ? WHERE id = ?',
      [creditChange, userId],
    );
  }

  async getCachedMembershipStatus(userId: string): Promise<{
    membershipTier: string | null;
    membershipExpiry: number | null;
  } | null> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.get<{
      membershipTier: string | null;
      membershipExpiry: number | null;
    } | undefined>(
      'SELECT membershipTier, membershipExpiry FROM users WHERE id = ?',
      [userId],
    );

    return result ?? null;
  }

  async cacheMembershipStatus(
    userId: string,
    membershipTier: string,
    expiry: number,
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      'UPDATE users SET membershipTier = ?, membershipExpiry = ? WHERE id = ?',
      [membershipTier, expiry, userId],
    );
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const databaseAPI = new DatabaseAPI();