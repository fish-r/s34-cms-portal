import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
  getContentIndex(): string {
    return 'Hello World!';
  }

  getContentById(): string {
    return 'get content by id';
  }

  /**
   * Receives the content as a blob
   * Pushes to S3
   * Pushes to ML model for classification and question generation
   */
  uploadContent() {}

  /**
   * Updates the questions, such as deleting or creating new questions
   */
  updateQuestions() {}
}
