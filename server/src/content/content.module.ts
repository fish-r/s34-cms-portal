// content.module.ts
import { Module } from '@nestjs/common';
import {
  ContentController,
  ContentWebHookController,
  TestContentController,
} from './content.controller';
import { ContentService } from './content.service';
import { AwsModule } from 'src/aws/aws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './content.model';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [
    AwsModule,
    MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }]),
  ],
  controllers: [
    ContentController,
    TestContentController,
    ContentWebHookController,
  ],
  providers: [ContentService, AwsService],
})
export class ContentModule {}
