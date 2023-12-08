import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { ContentService } from './content.service';
import { Content } from './content.model';
import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { readFileSync } from 'fs';
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
  getContentById(@Param() param: { id: string }) {
    const contentObject = this.contentService
      .getContentById(param.id)
      .then((result) => {
        return result;
      })
      .catch((err: MongooseError) => {
        console.log(err);
      });

    return contentObject;
  }

  @Post('/test')
  async testUpload() {
    try {
      const path = './testImage.png';
      const fileBuffer = readFileSync(path);
      const result = await this.awsService.uploadObject(
        'testingfile',
        fileBuffer,
      );
      console.log('post res', result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post()
  uploadContent(@Body() body: Content, @Res() res: Response) {
    this.contentService
      .insertToMongo(body)
      .then((result) => {
        console.log(result);
        res.statusCode = 201;
        res.json({
          status: res.statusCode,
          message: `Content inserted into DB with ID ${result._id}`,
        });
      })
      .catch((err: MongooseError) => {
        console.log(err);
        res.statusCode = 422;
        res.json({
          status: res.statusCode,
          message: 'Failed to write to DB',
          error: err.message,
        });
      });
  }

  @Patch('/:id')
  update(@Param() param: { id: string }, @Body() body: Content) {
    const contentObject = this.contentService
      .updateContentMetadata(param.id, body)
      .then((result) => {
        return result;
      })
      .catch((err: MongooseError) => {
        console.log(err);
      });

    return contentObject;
  }

  @Delete('/:id')
  delete(@Param() param: { id: string }) {
    const contentObject = this.contentService
      .delete(param.id)
      .then((result) => {
        return result;
      })
      .catch((err: MongooseError) => {
        console.log(err);
      });

    return contentObject;
  }
}
