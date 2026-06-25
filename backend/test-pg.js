import { Pool } from 'pg';

async function test() {
  const pool = new Pool({
    connectionString: "postgresql://postgres.cvfomxyqjcqvrndupueu:pAqrij-havsiw-toncu1@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
    ssl: { rejectUnauthorized: false }
  });
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("SUCCESS:", res.rows[0]);
  } catch(e) {
    console.error("ERROR:", e);
  } finally {
    await pool.end();
  }
}
test();
