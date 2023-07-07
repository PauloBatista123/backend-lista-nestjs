import { Body, Controller, Post } from '@nestjs/common';
import { PontoAtendimentoCreateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-create';
import { PontoAtendimento } from 'src/entities/pontoAtendimento.entity';
import { PontoAtendimentoService } from 'src/services/ponto-atendimento.service';

@Controller('ponto-atendimento')
export class PontoAtendimentoController {
  constructor(private pontoAtendimentoService: PontoAtendimentoService) {}

  @Post()
  async create(
    @Body() pontoAtendimentoDto: PontoAtendimentoCreateDto,
  ): Promise<PontoAtendimento> {
    return await this.pontoAtendimentoService.create(pontoAtendimentoDto);
  }
}
