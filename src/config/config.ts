export default {
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || 'database-schedula.cn9eiu9utwsi.us-east-1.rds.amazonaws.com',
  DB_USER: process.env.DB_USER || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD || 'SchedulA',
  DATABASE: process.env.DATABASE || 'db_schedula',
  DB_PORT: process.env.DB_PORT || 3306
}