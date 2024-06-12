// index.ts

import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET
};
