import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Job, JobCounts } from 'bull';
import { diskStorage } from 'multer';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { Importacao } from 'src/entities/importacao.entity';
import { ImportacaoService } from 'src/services/importacao.service';

@Controller('importacao')
export class ImportacaoController {
  constructor(private importacaoService: ImportacaoService) {}

  @Post('upload/cooperado')
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
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const id = await this.importacaoService.upload(file);

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
