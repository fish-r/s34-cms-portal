import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ContentService } from './content.service';
import { ContentRequestBody } from './content.model';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

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
  @UseInterceptors(FileInterceptor('file'))
  async createContentRecord(
    @Body() body: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    try {
      // Back up to S3
      const uploadResult = await this.awsService.uploadObject(
        file.originalname,
        file.buffer,
      );
      // console.log('S3 response', uploadResult);
      // Insert record into mongo only when upload is complete
      if (uploadResult.$metadata.httpStatusCode === 200) {
        const stringify = JSON.stringify(body);
        const bodyToJson = JSON.parse(stringify);
        const obj = JSON.parse(bodyToJson.body);
        const result = await this.contentService.insertContentMetadata(obj);
        response.statusCode = 201;
        response.send(result);
      } else {
        response.statusCode = uploadResult.$metadata.httpStatusCode;
        response.send({ message: 'Failed to upload to S3' });
      }

      //TODO: trigger processing here
    } catch (error) {
      console.log('errorr message', error.message);
      response.statusCode = 500;
      response.send({ message: error.message });
    }
  }

  @Patch('/:id')
  async updateContentMetadata(
    @Param() param: { id: string },
    @Body() body: ContentRequestBody,
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
  @UseInterceptors(FileInterceptor('file'))
  async testUpload(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);
      // const toBuffer = Buffer.from(body.media);
      const result = await this.awsService.uploadObject(
        file.originalname,
        file.buffer,
      );
      console.log('post res', result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
