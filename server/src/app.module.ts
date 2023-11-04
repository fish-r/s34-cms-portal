import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './content/content.module';
import { AwsModule } from './aws/aws.module';
import * as dotenv from 'dotenv';
import { TraineeModule } from './trainee/trainee.module';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';
console.log('Starting server in', process.env.NODE_ENV);

const connectionString =
  environment === 'development'
    ? process.env.MONGO_CONNECTION_DEV
    : process.env.MONGO_CONNECTION_PROD;

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    ContentModule,
    AwsModule,
    TraineeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
