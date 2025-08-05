
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 *
 */

const knexfile = {

  development: {
    client: process.env.DB_CLIENT || "postgresql",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || 5433,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "Pa55er#",
      database: process.env.DB_NAME || "ursadatabase"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: "./seeders"
    }

  },


};

export default knexfile
