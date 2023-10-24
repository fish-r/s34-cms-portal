import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';

import { ContentService } from './content.service';
import { Content } from './content.model';
import { Response } from 'express';
import { MongooseError } from 'mongoose';

@Controller('/api/v1/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getContentIndex() {
    const contentIndex = this.contentService
      .getContentIndex()
      .then((result) => result)
      .catch((err: MongooseError) => {
        console.log(err);
      });
    return contentIndex;
  }

  @Get('/:id')
  getContentById(@Param() param: { id: string }) {
    console.log('id param', param.id);
    const contentObject = this.contentService
      .getContentById(param.id)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err: MongooseError) => {
        console.log(err);
      });

    return contentObject;
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

  @Patch()
  updateQuestions() {}
}
