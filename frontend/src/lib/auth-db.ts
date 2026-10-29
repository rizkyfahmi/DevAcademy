import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string | null;
  salt: string | null;
  name: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
  newsletter: number;
  created_at: string;
  updated_at: string;
}

export interface OAuthAccountRecord {
  id: string;
  user_id: string;
  provider: string;
  provider_account_id: string;
  created_at: string;
}

export interface PasskeyRecord {
  id: string;
  user_id: string;
  credential_id: string;
  public_key: string;
  counter: number;
  device_name: string | null;
  created_at: string;
}

export interface SessionRecord {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface QuizResultRecord {
  id: string;
  user_id: string;
  quiz_slug: string;
  quiz_title: string;
  score: number;
  total_questions: number;
  percentage: number;
  passed: number;
  answers_json: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChapterProgressRecord {
  id: string;
  user_id: string;
  tech: string;
  chapter_slug: string;
  completed: number;
  completed_at: string;
}

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  // Store database file in hidden .data directory locally, or /tmp on Vercel/Serverless
  const cwd = process.cwd();
  const frontendDir = cwd.endsWith("frontend") ? cwd : path.resolve(cwd, "frontend");
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const dbDir = isServerless ? "/tmp" : path.resolve(frontendDir, ".data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, "devacademy-auth.db");
  const db = new DatabaseSync(dbPath);

  // Use DELETE journal mode on Windows to avoid .db-shm lock issues with Next.js Turbopack file watcher
  db.exec("PRAGMA journal_mode = DELETE;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Schema creation
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT,
      salt TEXT,
      name TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      avatar_url TEXT,
      role TEXT DEFAULT 'STUDENT',
      newsletter INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      provider_account_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (provider, provider_account_id)
    );

    CREATE TABLE IF NOT EXISTS passkeys (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      credential_id TEXT UNIQUE NOT NULL,
      public_key TEXT NOT NULL,
      counter INTEGER DEFAULT 0,
      device_name TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS passkey_challenges (
      challenge TEXT PRIMARY KEY,
      user_id TEXT,
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS quiz_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      quiz_slug TEXT NOT NULL,
      quiz_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      answers_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (user_id, quiz_slug)
    );

    CREATE TABLE IF NOT EXISTS chapter_progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      tech TEXT NOT NULL,
      chapter_slug TEXT NOT NULL,
      completed INTEGER DEFAULT 1,
      completed_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (user_id, tech, chapter_slug)
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      tech TEXT NOT NULL,
      chapter_slug TEXT NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (user_id, tech, chapter_slug)
    );

    CREATE TABLE IF NOT EXISTS saved_snippets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lang TEXT NOT NULL,
      title TEXT NOT NULL,
      code TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS search_history (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      query TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (user_id, query)
    );
  `);

  dbInstance = db;
  return db;
}

// Password hashing using NIST-approved PBKDF2 with SHA-512
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
}

export function verifyPassword(
  password: string,
  storedHash: string,
  salt: string
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(storedHash, "hex")
  );
}

// User operations
export function createUser(params: {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  newsletter?: boolean;
  avatarUrl?: string;
}): UserRecord {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  let password_hash: string | null = null;
  let salt: string | null = null;

  if (params.password) {
    const hashed = hashPassword(params.password);
    password_hash = hashed.hash;
    salt = hashed.salt;
  }

  const firstName = params.firstName?.trim() || "";
  const lastName = params.lastName?.trim() || "";
  const name =
    params.name?.trim() ||
    `${firstName} ${lastName}`.trim() ||
    params.email.split("@")[0];

  const stmt = db.prepare(`
    INSERT INTO users (id, email, password_hash, salt, name, first_name, last_name, avatar_url, role, newsletter, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'STUDENT', ?, ?, ?)
  `);

  stmt.run(
    id,
    params.email.toLowerCase().trim(),
    password_hash,
    salt,
    name,
    firstName || null,
    lastName || null,
    params.avatarUrl || null,
    params.newsletter ? 1 : 0,
    now,
    now
  );

  return findUserById(id)!;
}

export function findUserByEmail(email: string): UserRecord | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM users WHERE email = ? COLLATE NOCASE");
  const row = stmt.get(email.toLowerCase().trim()) as UserRecord | undefined;
  return row || null;
}

export function findUserById(id: string): UserRecord | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const row = stmt.get(id) as UserRecord | undefined;
  return row || null;
}

export function updateUserName(id: string, name: string): UserRecord | null {
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare("UPDATE users SET name = ?, updated_at = ? WHERE id = ?");
  stmt.run(name.trim(), now, id);
  return findUserById(id);
}

// OAuth Account operations
export function linkOAuthAccount(params: {
  userId: string;
  provider: string;
  providerAccountId: string;
}): void {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO accounts (id, user_id, provider, provider_account_id, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT (provider, provider_account_id) DO UPDATE SET user_id = excluded.user_id
  `);

  stmt.run(id, params.userId, params.provider, params.providerAccountId, now);
}

export function findUserByOAuth(
  provider: string,
  providerAccountId: string
): UserRecord | null {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT u.* FROM users u
    JOIN accounts a ON a.user_id = u.id
    WHERE a.provider = ? AND a.provider_account_id = ?
  `);
  const row = stmt.get(provider, providerAccountId) as UserRecord | undefined;
  return row || null;
}

// Session operations
export function createSession(userId: string): { token: string; expiresAt: Date } {
  const db = getDb();
  const id = crypto.randomUUID();
  const token = crypto.randomBytes(32).toString("hex");
  // 30 days session
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(id, userId, token, expiresAt.toISOString(), now);
  return { token, expiresAt };
}

export function findSession(token: string): {
  session: SessionRecord;
  user: Omit<UserRecord, "password_hash" | "salt">;
} | null {
  const db = getDb();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    SELECT s.id as s_id, s.user_id as s_user_id, s.token as s_token, s.expires_at as s_expires_at, s.created_at as s_created_at,
           u.id, u.email, u.name, u.first_name, u.last_name, u.avatar_url, u.role, u.newsletter, u.created_at, u.updated_at
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?
  `);

  const row = stmt.get(token, now) as any;
  if (!row) return null;

  return {
    session: {
      id: row.s_id,
      user_id: row.s_user_id,
      token: row.s_token,
      expires_at: row.s_expires_at,
      created_at: row.s_created_at,
    },
    user: {
      id: row.id,
      email: row.email,
      name: row.name,
      first_name: row.first_name,
      last_name: row.last_name,
      avatar_url: row.avatar_url,
      role: row.role,
      newsletter: row.newsletter,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  };
}

export function deleteSession(token: string): void {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM sessions WHERE token = ?");
  stmt.run(token);
}

// Passkey operations
export function savePasskey(params: {
  userId: string;
  credentialId: string;
  publicKey: string;
  counter?: number;
  deviceName?: string;
}): PasskeyRecord {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO passkeys (id, user_id, credential_id, public_key, counter, device_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    params.userId,
    params.credentialId,
    params.publicKey,
    params.counter || 0,
    params.deviceName || "Primary Device",
    now
  );

  return {
    id,
    user_id: params.userId,
    credential_id: params.credentialId,
    public_key: params.publicKey,
    counter: params.counter || 0,
    device_name: params.deviceName || "Primary Device",
    created_at: now,
  };
}

export function findPasskeyByCredentialId(
  credentialId: string
): (PasskeyRecord & { user: UserRecord }) | null {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT p.*, u.id as u_id, u.email as u_email, u.name as u_name, u.avatar_url as u_avatar_url, u.role as u_role
    FROM passkeys p
    JOIN users u ON u.id = p.user_id
    WHERE p.credential_id = ?
  `);

  const row = stmt.get(credentialId) as any;
  if (!row) return null;

  return {
    id: row.id,
    user_id: row.user_id,
    credential_id: row.credential_id,
    public_key: row.public_key,
    counter: row.counter,
    device_name: row.device_name,
    created_at: row.created_at,
    user: {
      id: row.u_id,
      email: row.u_email,
      name: row.u_name,
      avatar_url: row.u_avatar_url,
      role: row.u_role,
    } as any,
  };
}

export function findPasskeysByUserId(userId: string): PasskeyRecord[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM passkeys WHERE user_id = ?");
  return stmt.all(userId) as unknown as PasskeyRecord[];
}

export function savePasskeyChallenge(challenge: string, userId?: string): void {
  const db = getDb();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes validity
  const stmt = db.prepare(`
    INSERT INTO passkey_challenges (challenge, user_id, expires_at)
    VALUES (?, ?, ?)
  `);
  stmt.run(challenge, userId || null, expiresAt);
}

export function getAndConsumePasskeyChallenge(challenge: string): { challenge: string; userId: string | null } | null {
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    SELECT * FROM passkey_challenges WHERE challenge = ? AND expires_at > ?
  `);
  const row = stmt.get(challenge, now) as { challenge: string; user_id: string | null } | undefined;
  if (!row) return null;

  db.prepare("DELETE FROM passkey_challenges WHERE challenge = ?").run(challenge);
  return { challenge: row.challenge, userId: row.user_id };
}

// ---------------------------------------------------------------------------
// Quiz Results & User Learning Progress Tracking
// ---------------------------------------------------------------------------

export function saveQuizResult(params: {
  userId: string;
  quizSlug: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  answers?: any;
}): QuizResultRecord {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const percentage = Math.round((params.score / Math.max(1, params.totalQuestions)) * 100);
  const passed = percentage >= 60 ? 1 : 0;
  const answersJson = params.answers ? JSON.stringify(params.answers) : null;

  const stmt = db.prepare(`
    INSERT INTO quiz_results (
      id, user_id, quiz_slug, quiz_title, score, total_questions, percentage, passed, answers_json, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (user_id, quiz_slug) DO UPDATE SET
      quiz_title = excluded.quiz_title,
      score = MAX(quiz_results.score, excluded.score),
      total_questions = excluded.total_questions,
      percentage = MAX(quiz_results.percentage, excluded.percentage),
      passed = MAX(quiz_results.passed, excluded.passed),
      answers_json = excluded.answers_json,
      updated_at = excluded.updated_at
  `);

  stmt.run(
    id,
    params.userId,
    params.quizSlug,
    params.quizTitle,
    params.score,
    params.totalQuestions,
    percentage,
    passed,
    answersJson,
    now,
    now
  );

  return getUserQuizResult(params.userId, params.quizSlug)!;
}

export function getUserQuizResults(userId: string): QuizResultRecord[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM quiz_results 
    WHERE user_id = ? 
    ORDER BY updated_at DESC
  `);
  return stmt.all(userId) as unknown as QuizResultRecord[];
}

export function getUserQuizResult(userId: string, quizSlug: string): QuizResultRecord | null {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM quiz_results 
    WHERE user_id = ? AND quiz_slug = ?
  `);
  const row = stmt.get(userId, quizSlug) as QuizResultRecord | undefined;
  return row || null;
}

export function saveChapterProgress(params: {
  userId: string;
  tech: string;
  chapterSlug: string;
}): ChapterProgressRecord {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO chapter_progress (id, user_id, tech, chapter_slug, completed, completed_at)
    VALUES (?, ?, ?, ?, 1, ?)
    ON CONFLICT (user_id, tech, chapter_slug) DO UPDATE SET
      completed = 1,
      completed_at = excluded.completed_at
  `);

  stmt.run(id, params.userId, params.tech.toUpperCase(), params.chapterSlug, now);

  const getStmt = db.prepare(`
    SELECT * FROM chapter_progress 
    WHERE user_id = ? AND tech = ? AND chapter_slug = ?
  `);
  return getStmt.get(params.userId, params.tech.toUpperCase(), params.chapterSlug) as unknown as ChapterProgressRecord;
}

export function getUserChapterProgress(userId: string, tech?: string): ChapterProgressRecord[] {
  const db = getDb();
  if (tech) {
    const stmt = db.prepare(`
      SELECT * FROM chapter_progress 
      WHERE user_id = ? AND tech = ? 
      ORDER BY completed_at DESC
    `);
    return stmt.all(userId, tech.toUpperCase()) as unknown as ChapterProgressRecord[];
  }

  const stmt = db.prepare(`
    SELECT * FROM chapter_progress 
    WHERE user_id = ? 
    ORDER BY completed_at DESC
  `);
  return stmt.all(userId) as unknown as ChapterProgressRecord[];
}

export function getUserStats(userId: string): {
  totalQuizzes: number;
  passedQuizzes: number;
  avgScore: number;
  completedChapters: number;
} {
  const db = getDb();

  const quizStmt = db.prepare(`
    SELECT 
      COUNT(*) as total,
      SUM(passed) as passed,
      AVG(percentage) as avg_score
    FROM quiz_results 
    WHERE user_id = ?
  `);
  const quizRow = quizStmt.get(userId) as any;

  const chapStmt = db.prepare(`
    SELECT COUNT(*) as count FROM chapter_progress WHERE user_id = ?
  `);
  const chapRow = chapStmt.get(userId) as any;

  return {
    totalQuizzes: quizRow?.total || 0,
    passedQuizzes: quizRow?.passed || 0,
    avgScore: Math.round(quizRow?.avg_score || 0),
    completedChapters: chapRow?.count || 0,
  };
}

// ---------------------------------------------------------------------------
// Bookmarks / Saved Chapters & Code Snippets
// ---------------------------------------------------------------------------

export interface BookmarkRecord {
  id: string;
  user_id: string;
  tech: string;
  chapter_slug: string;
  title: string;
  url: string;
  created_at: string;
}

export function toggleBookmark(params: {
  userId: string;
  tech: string;
  chapterSlug: string;
  title: string;
  url: string;
}): { bookmarked: boolean; bookmark?: BookmarkRecord } {
  const db = getDb();
  const techUpper = params.tech.toUpperCase();

  const checkStmt = db.prepare(`
    SELECT * FROM bookmarks 
    WHERE user_id = ? AND tech = ? AND chapter_slug = ?
  `);
  const existing = checkStmt.get(params.userId, techUpper, params.chapterSlug) as any;

  if (existing) {
    db.prepare(`
      DELETE FROM bookmarks 
      WHERE user_id = ? AND tech = ? AND chapter_slug = ?
    `).run(params.userId, techUpper, params.chapterSlug);
    return { bookmarked: false };
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO bookmarks (id, user_id, tech, chapter_slug, title, url, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, params.userId, techUpper, params.chapterSlug, params.title, params.url, now);

  const newBookmark = checkStmt.get(params.userId, techUpper, params.chapterSlug) as any;
  return { bookmarked: true, bookmark: newBookmark };
}

export function getUserBookmarks(userId: string): BookmarkRecord[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM bookmarks 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `);
  return stmt.all(userId) as unknown as BookmarkRecord[];
}

export function isChapterBookmarked(userId: string, tech: string, chapterSlug: string): boolean {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT 1 FROM bookmarks 
    WHERE user_id = ? AND tech = ? AND chapter_slug = ?
  `);
  const row = stmt.get(userId, tech.toUpperCase(), chapterSlug);
  return !!row;
}

export interface SavedSnippetRecord {
  id: string;
  user_id: string;
  lang: string;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export function saveSnippet(params: {
  userId: string;
  lang: string;
  title: string;
  code: string;
}): SavedSnippetRecord {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO saved_snippets (id, user_id, lang, title, code, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, params.userId, params.lang, params.title, params.code, now, now);

  const stmt = db.prepare(`SELECT * FROM saved_snippets WHERE id = ?`);
  return stmt.get(id) as unknown as SavedSnippetRecord;
}

export function getUserSnippets(userId: string): SavedSnippetRecord[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM saved_snippets 
    WHERE user_id = ? 
    ORDER BY updated_at DESC
  `);
  return stmt.all(userId) as unknown as SavedSnippetRecord[];
}

export function deleteSnippet(userId: string, snippetId: string): boolean {
  const db = getDb();
  const res = db.prepare(`DELETE FROM saved_snippets WHERE id = ? AND user_id = ?`).run(snippetId, userId);
  return res.changes > 0;
}

export function addSearchHistory(userId: string, query: string): void {
  const clean = query.trim();
  if (!clean) return;
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  // If already exists, update updated_at so it bumps to the top
  db.prepare(`
    INSERT INTO search_history (id, user_id, query, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id, query) DO UPDATE SET updated_at = excluded.updated_at
  `).run(id, userId, clean, now, now);
}

export function getSearchHistory(userId: string, limit = 15): string[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT query FROM search_history 
    WHERE user_id = ? 
    ORDER BY updated_at DESC 
    LIMIT ?
  `).all(userId, limit) as { query: string }[];
  return rows.map((r) => r.query);
}

export function deleteSearchHistoryItem(userId: string, query: string): void {
  const db = getDb();
  db.prepare(`
    DELETE FROM search_history 
    WHERE user_id = ? AND query = ?
  `).run(userId, query.trim());
}

export function clearSearchHistory(userId: string): void {
  const db = getDb();
  db.prepare(`
    DELETE FROM search_history 
    WHERE user_id = ?
  `).run(userId);
}

