import Bull from 'bull';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';

export interface PageMetaDtoParams {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class GetJobStatus {
  id: Bull.JobId;
  progress: () => number;
  timestamp: number;
  finishedOn: Date;
  processedOn: Date;
}
