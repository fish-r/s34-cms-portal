import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ContentService } from './content.service';
import { Content } from './content.model';
import { AwsService } from 'src/aws/aws.service';

@Controller('/api/v1/content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly awsService: AwsService,
  ) {}

  @Get()
  async getContentIndex() {
    try {
      const contentIndex = await this.contentService.getContentIndex();
      return contentIndex;
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  async getContentMetadata(@Param() param: { id: string }) {
    try {
      const result = await this.contentService.getContentMetaData(param.id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Should backup to S3 and then insert into Mongo to prevent inconsistent records
  @Post()
  createContentRecord(@Body() body: Content) {
    try {
      // Back up to S3
      // this.awsService.uploadObject();

      // Insert record into mongo
      const result = this.contentService.insertContentMetadata(body);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Patch('/:id')
  async updateContentMetadata(
    @Param() param: { id: string },
    @Body() body: Content,
  ) {
    try {
      const result = await this.contentService.updateContentMetadata(
        param.id,
        body,
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete('/:id')
  async deleteContentRecord(@Param() param: { id: string }) {
    try {
      const result = await this.contentService.delete(param.id);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

@Controller('/api/test/content')
export class TestContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly awsService: AwsService,
  ) {}

  @Get('/download/:key')
  async testDownload(@Param() param: { key: string }) {
    try {
      const key = param.key;
      const result = await this.awsService.retrieveObject(key);
      console.log(result.Body);
      const bufToString = (await result.Body.transformToByteArray()).toString();
      return bufToString;
      // return result;
    } catch (error) {
      return error;
    }
  }

  @Post('/upload')
  async testUpload(@Body() body: { media: string }) {
    try {
      const toBuffer = Buffer.from(body.media);
      const result = await this.awsService.uploadObject('testfile', toBuffer);
      console.log('post res', result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
