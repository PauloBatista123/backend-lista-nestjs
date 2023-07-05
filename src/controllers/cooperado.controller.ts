import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  HttpException,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Job } from 'bull';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { Cooperado } from 'src/entities/cooperado.entity';
import { CooperadoService } from 'src/services/cooperado.service';

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
  async uploadCooperado(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'xlsx' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
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
