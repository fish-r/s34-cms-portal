import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './content.model';
import { Model } from 'mongoose';

@Injectable()
export class ContentService {
  // constructor(@InjectConnection() private connection: Connection) {}
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
  ) {}

  getContentIndex(): any {
    return this.contentModel.find();
  }

  getContentById(id: string): any {
    return this.contentModel.findById(id);
  }

  /**
   * Receives the content as a blob
   * Pushes blob to S3
   * Pushes blob to ML model for classification and question generation
   */
  pushToS3() {}

  /**
   * Insert metadata into MongoDB
   * @param content Content metadata to be written to mongo
   */
  insertToMongo(content: Content) {
    const contentMetadata = new this.contentModel(content);
    const result = contentMetadata.save();
    return result;
  }

  /**
   * Updates the questions, such as deleting or creating new questions
   */
  updateQuestions() {}
}
