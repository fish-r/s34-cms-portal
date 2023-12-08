import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  /**
   * Receives the content as a blob, then pushes to s3
   * @param key: Name of file
   * @param body: content to be pushed
   */
  pushToS3() {}

  /**
   * Pull object from Amazon S3 Storage
   * @param key: Name of file to be retrieved
   */
  pullFromS3() {}
}
