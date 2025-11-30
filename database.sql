CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(60) NOT NULL CHECK (char_length(name) >= 20),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'USER', 'STORE_OWNER'))
);

CREATE TABLE ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, address, role)
VALUES (
  'This is system admin user for testing',
  'admin@example.com',
  '$2b$10$e9m7yJnISoV3th0A3GafWep1aEBKmpTP6kaRBflI/RqC2ZuD/vNUa',
  'Admin Address',
  'ADMIN'
);

INSERT INTO users (name, email, password, address, role)
VALUES (
  'This is normal user test account',
  'normaluser@example.com',
  '$2b$10$e9m7yJnISoV3th0A3GafWep1aEBKmpTP6kaRBflI/RqC2ZuD/vNUa',
  'Pune, India',
  'USER'
);

INSERT INTO users (name, email, password, address, role)
VALUES (
  'This is a sample store owner user',
  'owner@example.com',
  '$2b$10$e9m7yJnISoV3th0A3GafWep1aEBKmpTP6kaRBflI/RqC2ZuD/vNUa',
  'Wakad, Pune',
  'STORE_OWNER'
);
