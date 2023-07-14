import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricoCreateDto } from 'src/dtos/historico/historico-create.dto';
import { Historico } from 'src/entities/historico.entity';
import { HistoricoRepository, ProdutoCartaoRepository } from 'src/repositories';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(HistoricoRepository) private historicoRepository: HistoricoRepository,
    @InjectRepository(ProdutoCartaoRepository) private produtoCartaoRepository: ProdutoCartaoRepository,
  ) {}

  async create(dados: HistoricoCreateDto): Promise<Historico> {
    try {
      const produtoCartao = this.produtoCartaoRepository.findOneByOrFail({ id: dados.produtoId });

      return await this.historicoRepository.save({
        comentario: dados.comentario,
        produtoCartaoId: dados.produtoId,
        tabela: dados.tabela,
      });
    } catch (error) {
      throw new BadRequestException(`O produto id ${dados.produtoId} não exite`);
    }
  }
}
