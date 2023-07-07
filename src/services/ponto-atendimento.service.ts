import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PontoAtendimentoCreateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-create';
import { PontoAtendimentoUpdateDto } from 'src/dtos/ponto-atendimento/ponto-atendimento-update';
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
    return await this.pontoAtendimentoRepository.save({
      cidade: pontoAtendimentoDto.cidade,
      id: pontoAtendimentoDto.id,
      nome: pontoAtendimentoDto.nome,
    });
  }

  async update(pontoAtendimentoDto: PontoAtendimentoUpdateDto, id: number) {
    try {
      const pa = await this.pontoAtendimentoRepository.findOneByOrFail({ id });

      return await this.pontoAtendimentoRepository
        .merge(pa, {
          nome: pontoAtendimentoDto.nome,
          cidade: pontoAtendimentoDto.cidade,
        })
        .save();
    } catch (error) {
      throw new NotFoundException(
        'O registro que você está tentando alterar não existe',
      );
    }
  }
}
