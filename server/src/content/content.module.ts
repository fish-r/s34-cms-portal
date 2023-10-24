// content.module.ts
import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule], // Include AwsModule in the imports array
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
