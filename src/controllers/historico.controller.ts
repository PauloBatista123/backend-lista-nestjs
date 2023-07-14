import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { HistoricoCreateDto } from 'src/dtos/historico/historico-create.dto';
import { Historico } from 'src/entities/historico.entity';
import { HistoricoService } from 'src/services/historico.service';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dados: HistoricoCreateDto): Promise<Historico> {
    return this.historicoService.create(dados);
  }
}
