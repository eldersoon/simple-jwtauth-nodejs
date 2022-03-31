import User from './src/modules/users/typeorm/entities/User'

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DE_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
}
