import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/dtos/page/page-meto.dto';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { Cooperado } from 'src/entities/cooperado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CooperadoService {
  constructor(
    @InjectRepository(Cooperado)
    private cooperadoRepository: Repository<Cooperado>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cooperado>> {
    const queryBuilder =
      this.cooperadoRepository.createQueryBuilder('cooperado');

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

    queryBuilder
      .orderBy('cooperado.id')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Cooperado> {
    return await this.cooperadoRepository.findOneBy({ id });
  }
}
