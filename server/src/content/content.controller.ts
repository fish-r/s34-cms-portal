import { Controller, Get, Patch, Post } from '@nestjs/common';

import { ContentService } from './content.service';

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
  uploadContent() {}

  @Patch()
  updateQuestions() {}
}
