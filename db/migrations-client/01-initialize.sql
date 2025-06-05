CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS fruit (
  id TEXT PRIMARY KEY,
  at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS fruit_idx ON fruit (at);

CREATE TABLE IF NOT EXISTS click (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "on" TEXT NOT NULL references fruit(id),
  at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS click_idx ON click ("on", at);

INSERT INTO fruit (id)
VALUES
  ('🍇'),
  ('🍈'),
  ('🍉'),
  ('🍊'),
  ('🍋'),
  ('🍋‍🟩'),
  ('🍌'),
  ('🍍'),
  ('🍎'),
  ('🍏'),
  ('🍐'),
  ('🍑'),
  ('🍒'),
  ('🍓'),
  ('🥝'),
  ('🥥'),
  ('🥭'),
  ('🫐')
ON CONFLICT DO NOTHING;
