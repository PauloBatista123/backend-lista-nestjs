import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/dtos/page/page-meto.dto';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { ProdutoAlterarDto } from 'src/dtos/produto/produto-alterar';
import { ProdutoCriarDto } from 'src/dtos/produto/produto-criar';
import { Produto } from 'src/entities/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepositoy: Repository<Produto>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Produto>> {
    const queryBuilder = this.produtoRepositoy.createQueryBuilder('produto');

    queryBuilder
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip)
      .orderBy('produto.id');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async create(produtoCriarDto: ProdutoCriarDto): Promise<Produto> {
    const produto = new Produto();
    produto.nome = produtoCriarDto.nome;
    produto.descricao = produtoCriarDto.descricao;
    await produto.save();

    return produto;
  }

  async update(
    id: string,
    produtoAlterarDto: ProdutoAlterarDto,
  ): Promise<Produto> {
    const produto = await this.produtoRepositoy.findOneBy({ id: +id });

    if (produtoAlterarDto.descricao)
      produto.descricao = produtoAlterarDto.descricao;
    if (produtoAlterarDto.nome) produto.nome = produtoAlterarDto.nome;

    await produto.save();

    return produto;
  }
}
