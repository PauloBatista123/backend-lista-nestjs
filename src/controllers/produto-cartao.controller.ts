import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import {
  GROUP_ALL_CARTOES,
  GROUP_ALL_COOPERADO as GRUPO_ALL_COOPERADO,
  GROUP_ALL_PONTO_ATENDIMENTO,
  GROUP_FIND_CARTOES,
  ProdutoCartao,
} from 'src/entities';
import { ProdutoCartaoService } from 'src/services/produto-cartao.service';

@Controller('produto-cartao')
@UseInterceptors(ClassSerializerInterceptor)
export class ProdutoCartaoController {
  constructor(private readonly produtoCartaoService: ProdutoCartaoService) {}

  @SerializeOptions({
    groups: [GROUP_ALL_CARTOES],
  })
  @Get()
  async findAll(@Query() pageOptions: PageOptionsDto): Promise<PageDto<ProdutoCartao>> {
    return await this.produtoCartaoService.findAll(pageOptions);
  }

  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_FIND_CARTOES, GROUP_ALL_PONTO_ATENDIMENTO, GRUPO_ALL_COOPERADO],
  })
  async findById(@Param('id') id: number): Promise<ProdutoCartao> {
    return await this.produtoCartaoService.findById(id);
  }
}
