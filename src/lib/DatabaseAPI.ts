import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import bcrypt from 'bcryptjs';

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
  name: string;
  email: string;
  password: string;
  credits: number;
  membershipTier?: string | null;
  membershipExpiry?: number | null;
}

export class DatabaseAPI {
  private db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

  async initialize() {
    if (this.db) return;

    const dbPath = path.join(process.cwd(), 'database.sqlite');
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Update the users table to include cached membership tier and expiry
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        credits INTEGER DEFAULT 10,
        membershipTier TEXT, -- Cached membership tier from Patreon
        membershipExpiry INTEGER -- Expiration timestamp for cached membership
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
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id)
      );
    `);
  }

  // Create a new user
  async createUser(name: string, email: string, password: string): Promise<User> {
    if (!this.db) throw new Error('Database not initialized');

    const hashedPassword = await bcrypt.hash(password, 10);
    const { lastID } = await this.db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const user = await this.getUserById(lastID.toString());
    if (!user) throw new Error('Failed to create user');

    return user;
  }

  // Retrieve a user by email
  async getUserByEmail(email: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    const user = await this.db.get<User | null>('SELECT * FROM users WHERE email = ?', email);
    return user || null;
  }

  // Retrieve a user by ID
  async getUserById(id: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    return (await this.db.get<User | null>('SELECT * FROM users WHERE id = ?', id)) ?? null;
  }

  // Verify user credentials during login
  async verifyUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Save image metadata
  async saveImageMetadata(data: Omit<ImageMetadata, 'id' | 'createdAt'>): Promise<ImageMetadata> {
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
      ]
    );

    const savedData = await this.db.get<ImageMetadata>('SELECT * FROM image_metadata WHERE id = ?', lastID);
    if (!savedData) throw new Error('Failed to retrieve saved data');

    return savedData;
  }

  // Get recent images (optionally filtered by user)
  async getRecentImages(limit: number = 20, userId?: string): Promise<ImageMetadata[]> {
    if (!this.db) throw new Error('Database not initialized');

    const query = userId 
      ? 'SELECT * FROM image_metadata WHERE userId = ? ORDER BY createdAt DESC LIMIT ?'
      : 'SELECT * FROM image_metadata ORDER BY createdAt DESC LIMIT ?';

    const params = userId ? [userId, limit] : [limit];

    return this.db.all<ImageMetadata[]>(query, ...params);
  }

  // Get user credits
  async getUserCredits(userId: string): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.get<{ credits: number }>('SELECT credits FROM users WHERE id = ?', userId);
    return result?.credits || 0;
  }

  // Update user credits
  async updateUserCredits(userId: string, creditChange: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run('UPDATE users SET credits = credits + ? WHERE id = ?', creditChange, userId);
  }

  // Get cached membership status for a user
  async getCachedMembershipStatus(userId: string): Promise<{ membershipTier: string | null, membershipExpiry: number | null } | null> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.get<{ membershipTier: string | null, membershipExpiry: number | null }>(
      'SELECT membershipTier, membershipExpiry FROM users WHERE id = ?',
      userId
    );

    if (!result) return null;

    return {
      membershipTier: result.membershipTier,
      membershipExpiry: result.membershipExpiry
    };
  }

  // Cache membership status with expiration time
  async cacheMembershipStatus(userId: string, membershipTier: string, expiry: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.run(
      'UPDATE users SET membershipTier = ?, membershipExpiry = ? WHERE id = ?',
      membershipTier,
      expiry,
      userId
    );
  }

  // Close the database connection
  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const databaseAPI = new DatabaseAPI();