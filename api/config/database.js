module.exports = {
  username: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'admin',
  database: process.env.MYSQL_DATABASE || 'mystore',
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
  logging: false
}