import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Job } from 'bull';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { CreateCooperadoDto } from 'src/dtos/cooperado/create-cooperado.dto';
import { UpdateCooperadoDto } from 'src/dtos/cooperado/update-cooperado.dto';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { Cooperado } from 'src/entities/cooperado.entity';
import { CooperadoService } from 'src/services/cooperado.service';
import { GetJobStatus } from 'src/utils/interfaces';

@Controller('cooperado')
export class CooperadoController {
  constructor(private readonly cooperadoService: CooperadoService) {}

  @Post()
  create(@Body() createCooperadoDto: CreateCooperadoDto) {
    return this.cooperadoService.create(createCooperadoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Cooperado>> {
    return this.cooperadoService.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cooperado | Response> {
    const cooperado = await this.cooperadoService.findOne(+id);

    if (cooperado) return cooperado;

    throw new HttpException('Cooperado não encontrado', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCooperadoDto: UpdateCooperadoDto,
  ) {
    return this.cooperadoService.update(+id, updateCooperadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cooperadoService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads/cooperados',
      preservePath: true,
      storage: diskStorage({
        filename: (req, file, cb) => cb(null, file.originalname),
      }),
    }),
  )
  async uploadCooperado(@UploadedFile() file: Express.Multer.File) {
    const id = await this.cooperadoService.upload(file);

    return {
      id,
      message: 'Arquivo enviado para processamento',
    };
  }

  @Get('upload/:id')
  async getJob(@Param('id') id: number): Promise<Job> {
    return await this.cooperadoService.getJob(id);
  }
}
