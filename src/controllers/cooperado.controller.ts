import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import { Cooperado } from 'src/entities';
import { CooperadoService } from 'src/services';

@Controller('cooperado')
export class CooperadoController {
  constructor(private readonly cooperadoService: CooperadoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query()
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Cooperado>> {
    return this.cooperadoService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cooperado | Response> {
    const cooperado = await this.cooperadoService.findOne(+id);

    if (cooperado) return cooperado;

    throw new HttpException('Cooperado não encontrado', HttpStatus.NOT_FOUND);
  }
}
