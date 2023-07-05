import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCooperadoDto } from 'src/dtos/cooperado/create-cooperado.dto';
import { CooperadoDto } from 'src/dtos/cooperado/lista-cooperado.dto';
import { UpdateCooperadoDto } from 'src/dtos/cooperado/update-cooperado.dto';
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

  create(createCooperadoDto: CreateCooperadoDto) {
    return 'This action adds a new cooperado';
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cooperado>> {
    const queryBuilder =
      this.cooperadoRepository.createQueryBuilder('cooperado');

    queryBuilder
      .orderBy('cooperado.id')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Cooperado> {
    return await this.cooperadoRepository.findOneBy({ id });
  }

  update(id: number, updateCooperadoDto: UpdateCooperadoDto) {
    return `This action updates a #${id} cooperado`;
  }

  remove(id: number) {
    return `This action removes a #${id} cooperado`;
  }
}
