import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PontoAtendimentoCreateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-create';
import { PontoAtendimento } from 'src/entities/pontoAtendimento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PontoAtendimentoService {
  constructor(
    @InjectRepository(PontoAtendimento)
    private pontoAtendimentoRepository: Repository<PontoAtendimento>,
  ) {}

  async create(
    pontoAtendimentoDto: PontoAtendimentoCreateDto,
  ): Promise<PontoAtendimento> {
    if (
      await this.pontoAtendimentoRepository.countBy({
        id: pontoAtendimentoDto.id,
      })
    ) {
      throw new BadRequestException(
        'O número informado para ID do PA já existe.',
      );
    }
    return this.pontoAtendimentoRepository.create({
      cidade: pontoAtendimentoDto.cidade,
      id: pontoAtendimentoDto.id,
      nome: pontoAtendimentoDto.nome,
    });
  }
}
