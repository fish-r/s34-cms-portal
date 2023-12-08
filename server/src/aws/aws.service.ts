import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  /**
   * Receives the content as a buffer, then pushes to s3
   * @param key: Name of file
   * @param body: content to be pushed
   */
  async uploadObject(key: string, body: Buffer) {
    console.log('Pushing file to S3: ', key);
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: body,
    });
    const res = await this.s3Client.send(command);
    // return {
    //   key: key,
    //   httpStatusCode: res.$metadata.httpStatusCode,
    //   attempts: res.$metadata.attempts,
    // };
    return res;
  }

  /**
   * Pull object from Amazon S3 Storage
   * @param key: Name of file to be retrieved
   */
  pullFromS3() {}
}
