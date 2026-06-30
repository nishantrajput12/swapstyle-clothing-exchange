import postgres from 'postgres';

const DB_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_op6g4QtyYurK@ep-solitary-lab-atgggzjl-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = postgres(DB_URL, {
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

export default sql;
