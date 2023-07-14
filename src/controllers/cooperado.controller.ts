import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { Response } from 'express';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import { Cooperado, GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO } from 'src/entities';
import { CooperadoService } from 'src/services';

@Controller('cooperado')
@UseInterceptors(ClassSerializerInterceptor)
export class CooperadoController {
  constructor(private readonly cooperadoService: CooperadoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    groups: [GROUP_ALL_COOPERADO],
  })
  async findAll(
    @Query()
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Cooperado>> {
    return this.cooperadoService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_FIND_COOPERADO],
  })
  async findOne(@Param('id') id: string): Promise<Cooperado | Response> {
    const cooperado = await this.cooperadoService.findOne(+id);

    if (cooperado) return cooperado;

    throw new HttpException('Cooperado não encontrado', HttpStatus.NOT_FOUND);
  }
}
