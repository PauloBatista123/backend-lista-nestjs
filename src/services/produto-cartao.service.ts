import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dtos/page';
import { ProdutoCartao } from 'src/entities';
import { ProdutoCartaoRepository } from 'src/repositories/produto-cartao.repository';

@Injectable()
export class ProdutoCartaoService {
  constructor(
    @InjectRepository(ProdutoCartaoRepository)
    private produtoCartaoRepository: ProdutoCartaoRepository,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProdutoCartao>> {
    const queryBuilder = this.produtoCartaoRepository.createQueryBuilder('produtoCartao');

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

    return new PageDto(entities, pageOptions);
  }
}
