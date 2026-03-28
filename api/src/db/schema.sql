CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  due_date TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'booked', 'archived')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  referrer TEXT,
  visitor_id TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON page_views(visitor_id);
