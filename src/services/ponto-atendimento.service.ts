import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dtos/page';
import { PontoAtendimentoCreateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-create';
import { PontoAtendimentoUpdateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-update';
import { PontoAtendimento } from 'src/entities';
import { PontoAtendimentoRespository } from 'src/repositories';

@Injectable()
export class PontoAtendimentoService {
  constructor(
    @InjectRepository(PontoAtendimentoRespository)
    private pontoAtendimentoRepository: PontoAtendimentoRespository,
  ) {}

  /**
   * Função para criar um novo ponto de atendimento
   * @param {PontoAtendimentoCreateDto} pontoAtendimentoDto
   * @returns {Promise<PontoAtendimento>}
   */
  async create(pontoAtendimentoDto: PontoAtendimentoCreateDto): Promise<PontoAtendimento> {
    if (
      await this.pontoAtendimentoRepository.countBy({
        id: pontoAtendimentoDto.id,
      })
    ) {
      throw new BadRequestException('O número informado para ID do PA já existe.');
    }
    return await this.pontoAtendimentoRepository.save({
      cidade: pontoAtendimentoDto.cidade,
      id: pontoAtendimentoDto.id,
      nome: pontoAtendimentoDto.nome,
    });
  }

  /**
   * Função para alterar ponto de atendimento
   * @param {PontoAtendimentoUpdateDto} pontoAtendimentoDto
   * @param {number} id
   * @returns {Promise<PontoAtendimento>}
   * @throws {NotFoundException} Retornar uma exceção caso não encontre o registro com id informado
   */
  async update(pontoAtendimentoDto: PontoAtendimentoUpdateDto, id: number): Promise<PontoAtendimento> {
    try {
      const pa = await this.pontoAtendimentoRepository.findOneByOrFail({ id });

      return await this.pontoAtendimentoRepository
        .merge(pa, {
          nome: pontoAtendimentoDto.nome,
          cidade: pontoAtendimentoDto.cidade,
        })
        .save();
    } catch (error) {
      throw new NotFoundException('O registro que você está tentando alterar não existe');
    }
  }

  /**
   * Função para retornar todos os regist
   * @param {PageOptionsDto} pageOptionsDto
   * @returns {Promise<PageDto<PontoAtendimento>>}
   */
  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<PontoAtendimento>> {
    const queryBuilder = this.pontoAtendimentoRepository.createQueryBuilder('pontoAtendimento');

    queryBuilder.take(pageOptionsDto.take).skip(pageOptionsDto.skip).orderBy('pontoAtendimento.id');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMeta = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMeta);
  }

  async findById(id: number): Promise<PontoAtendimento> {
    return await this.pontoAtendimentoRepository.findOneBy({ id });
  }
}
