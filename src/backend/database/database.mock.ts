import { createConnection, EntitySchema, Connection } from 'typeorm';

type Entity = Function | string | EntitySchema<any>;

export async function createMockDatabase(
  entities: Entity[]
): Promise<Connection> {
  return createConnection({
    // name, // let TypeORM manage the connections
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
  });
}
