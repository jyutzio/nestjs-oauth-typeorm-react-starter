import { createConnection, Connection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Connection> =>
      await createConnection({
        type: 'sqlite',
        database: 'database.sqlite',
        synchronize: true,
        logging: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
  {
    provide: 'DATABASE_CONNECTION_MOCK',
    useFactory: async (): Promise<Connection> =>
      await createConnection({
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        logging: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
];
