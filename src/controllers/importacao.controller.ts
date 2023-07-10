import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  Body,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Job, JobCounts } from 'bull';
import { diskStorage } from 'multer';
import { ImportacaoDto } from 'src/dtos/importacao/importar.dto';
import { PageDto, PageOptionsDto } from 'src/dtos/page';
import { Importacao } from 'src/entities';
import { ImportacaoService } from 'src/services';

@Controller('importacao')
export class ImportacaoController {
  constructor(private importacaoService: ImportacaoService) {}

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
        .addFileTypeValidator({
          fileType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() bodyImportacao: ImportacaoDto,
  ) {
    await this.importacaoService.validateFileReader(
      file,
      bodyImportacao.tabela,
    );

    const id = await this.importacaoService.upload(file, bodyImportacao.tabela);

    return {
      id,
      message: 'Arquivo enviado para processamento',
    };
  }

  @Get('upload/:id')
  async getJob(@Param('id') id: number): Promise<Job> {
    return await this.importacaoService.getJobById(id);
  }

  @Get('upload/counts')
  async getJobLogs(): Promise<JobCounts> {
    return await this.importacaoService.getJobCounts();
  }

  @Get('upload')
  async getJobs(
    @Query() pageOptiosDto: PageOptionsDto,
  ): Promise<PageDto<Importacao>> {
    return await this.importacaoService.getJob(pageOptiosDto);
  }
}
