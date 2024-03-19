import { pool } from "@/app/lib/data/data"

  class Users {
      async getUser() {
          const consult = `SELECT * FROM users`
          const respondse = await pool.query(consult)
          return respondse.rows || false;
}

}