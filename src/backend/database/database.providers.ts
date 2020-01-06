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
];
