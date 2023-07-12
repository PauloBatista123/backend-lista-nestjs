import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import { PontoAtendimentoCreateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-create';
import { PontoAtendimentoUpdateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-update';
import { PontoAtendimento } from 'src/entities';
import { PontoAtendimentoService } from 'src/services';

@Controller('ponto-atendimento')
export class PontoAtendimentoController {
  constructor(private pontoAtendimentoService: PontoAtendimentoService) {}

  @Post()
  async create(@Body() pontoAtendimentoDto: PontoAtendimentoCreateDto): Promise<PontoAtendimento> {
    return await this.pontoAtendimentoService.create(pontoAtendimentoDto);
  }

  @Put(':id')
  async update(@Body() pontoAtendimentoDto: PontoAtendimentoUpdateDto, @Param('id') id: number) {
    return await this.pontoAtendimentoService.update(pontoAtendimentoDto, id);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<PontoAtendimento>> {
    return await this.pontoAtendimentoService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<PontoAtendimento> {
    return await this.pontoAtendimentoService.findById(id);
  }
}
