// content.module.ts
import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
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
  controllers: [ContentController],
  providers: [ContentService, AwsService],
})
export class ContentModule {}
