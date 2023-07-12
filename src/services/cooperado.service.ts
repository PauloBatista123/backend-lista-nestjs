import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dtos/page';
import { Cooperado } from 'src/entities';
import { CooperadoRepository } from 'src/repositories';

@Injectable()
export class CooperadoService {
  constructor(
    @InjectRepository(CooperadoRepository)
    private cooperadoRepository: CooperadoRepository,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cooperado>> {
    const queryBuilder = this.cooperadoRepository.createQueryBuilder('cooperado');

    if (pageOptionsDto.nome) {
      queryBuilder.where('cooperado.nome like :nome', {
        nome: `%${pageOptionsDto.nome}%`,
      });
    }

    if (pageOptionsDto.sigla) {
      queryBuilder.where('cooperado.sigla = :sigla', {
        sigla: pageOptionsDto.sigla,
      });
    }

    queryBuilder.orderBy('cooperado.id').skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Cooperado> {
    return await this.cooperadoRepository.findOneBy({ id });
  }
}
