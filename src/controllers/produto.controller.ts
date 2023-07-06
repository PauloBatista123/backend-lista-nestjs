import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { ProdutoCriarDto } from 'src/dtos/produto/produto-criar';
import { Produto } from 'src/entities/produto.entity';
import { ProdutoService } from 'src/services/produto.service';

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
}
