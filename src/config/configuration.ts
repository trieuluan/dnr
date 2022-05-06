export default () => ({
  sftp: {
    host: process.env.DNR_HOST || '127.0.0.1',
    port: process.env.DNR_PORT || 22,
    username: process.env.DNR_USERNAME || 'root',
    password: process.env.DNR_PASSWORD || '',
  },
  databases: {
    mongodb: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 27017,
      database: process.env.DB_DATABASE || null,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || ''
    }
  }
});
