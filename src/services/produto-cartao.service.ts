import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dtos/page';
import { ProdutoCartao } from 'src/entities';
import { Historico } from 'src/entities/historico.entity';
import { ProdutoCartaoRepository } from 'src/repositories/produto-cartao.repository';
import { RedisService } from './redis.service';

@Injectable()
export class ProdutoCartaoService {
  constructor(
    @InjectRepository(ProdutoCartaoRepository)
    private produtoCartaoRepository: ProdutoCartaoRepository,
    private readonly redis: RedisService,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProdutoCartao>> {
    const cached = await this.redis.get(`find-all:${Object.values(pageOptionsDto).toString()}`);

    const queryBuilder = this.produtoCartaoRepository.createQueryBuilder('produtoCartao');

    if (!cached) {
      queryBuilder
        .leftJoinAndSelect('produtoCartao.cooperado', 'cooperado')
        .leftJoinAndSelect('produtoCartao.pontoAtendimento', 'pontoAtendimento')
        .leftJoinAndSelect('produtoCartao.produto', 'produto')
        .take(pageOptionsDto.take)
        .skip(pageOptionsDto.skip)
        .orderBy('produtoCartao.pontoAtendimentoId');

      const { entities } = await queryBuilder.getRawAndEntities();

      const itemCount = await queryBuilder.getCount();

      const pageOptions = new PageMetaDto({ pageOptionsDto, itemCount });

      const dados = new PageDto(entities, pageOptions);

      await this.redis.set(`find-all:${Object.values(pageOptionsDto).toString()}`, JSON.stringify(dados), 'EX', 15);
      return dados;
    }

    return JSON.parse(cached);
  }

  async findById(id: number): Promise<ProdutoCartao> {
    return await this.produtoCartaoRepository.findOneOrFail({
      where: { id: id },
      relations: {
        historicos: true,
        cooperado: true,
        pontoAtendimento: true,
        produto: true,
      },
    });
  }
}
