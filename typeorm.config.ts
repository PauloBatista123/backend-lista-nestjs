import { Cooperado } from 'src/entities/cooperado.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'cedoc',
  password: '1234',
  database: 'lista-inteligente',
  entities: [Cooperado],
});
