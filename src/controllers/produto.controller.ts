import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import { ProdutoAlterarDto } from 'src/dtos/produto/produto-alterar';
import { ProdutoCriarDto } from 'src/dtos/produto/produto-criar';
import { Produto } from 'src/entities';
import { ProdutoService } from 'src/services';

@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Get()
  async findAll(
    @Query() pageOptionsdto: PageOptionsDto,
  ): Promise<PageDto<Produto>> {
    return await this.produtoService.findAll(pageOptionsdto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() produtoCriarDto: ProdutoCriarDto): Promise<Produto> {
    return await this.produtoService.create(produtoCriarDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() produtoAlterarDto: ProdutoAlterarDto,
  ) {
    return await this.produtoService.update(id, produtoAlterarDto);
  }
}
