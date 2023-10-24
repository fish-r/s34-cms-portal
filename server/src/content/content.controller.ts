import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';

import { ContentService } from './content.service';
import { Content } from './content.model';
import { Response } from 'express';

@Controller('/api/v1/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getContentIndex(): string {
    return this.contentService.getContentIndex();
  }

  @Get()
  getContentById(): string {
    return this.contentService.getContentById();
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
      .catch((err) => {
        console.log(err);
        res.statusCode = 422;
        res.json({ status: res.statusCode, message: 'Failed to write to DB' });
      });
  }

  @Patch()
  updateQuestions() {}
}
