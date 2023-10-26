// export * from './development';
export const config = {
  db: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'qwer1234',
    database: process.env.DB_NAME || 'db_name',
    extra: {
      connectionLimit: 5,
    },
    autoLoadEntities: true,
  },
  graphql: {
    playground: false,
  },
};
