export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: true,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'qwer1234',
    database: process.env.DB_NAME || 'db_name',
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
  },
  foo: 'dev-bar',
};
