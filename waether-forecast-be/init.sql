-- Створення бази вже не потрібно — docker зробить це сам
-- Але можна створити таблиці, користувачів тощо
CREATE TABLE IF NOT EXISTS test_table (
  id SERIAL PRIMARY KEY,
  name TEXT
);

-- Просто для тесту:
INSERT INTO test_table (name) VALUES ('Привіт, світ!');
