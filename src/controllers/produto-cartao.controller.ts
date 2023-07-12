import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import { ProdutoCartao } from 'src/entities';
import { ProdutoCartaoService } from 'src/services/produto-cartao.service';

@Controller('produto-cartao')
export class ProdutoCartaoController {
  constructor(private readonly produtoCartaoService: ProdutoCartaoService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() pageOptions: PageOptionsDto): Promise<PageDto<ProdutoCartao>> {
    return await this.produtoCartaoService.findAll(pageOptions);
  }
}
