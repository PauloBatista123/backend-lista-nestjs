import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cooperado, Importacao, Produto, ProdutoCartao, User } from 'src/entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'cedoc',
  password: '1234',
  timezone: 'UTC-03:00',
  database: 'lista-inteligente',
  entities: [User, Cooperado, Produto, Importacao, ProdutoCartao],
  synchronize: true,
  autoLoadEntities: true,
};
