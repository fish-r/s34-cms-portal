// content.module.ts
import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TraineeSchema } from './trainee.model';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

@Module({
  imports: [
    AwsModule,
    MongooseModule.forFeature([{ name: 'Trainee', schema: TraineeSchema }]),
  ],
  controllers: [TraineeController],
  providers: [TraineeService],
})
export class TraineeModule {}
