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

import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { TraineeService } from './trainee.service';
import { Trainee } from './trainee.model';

@Controller('/api/v1/trainee')
export class TraineeController {
  constructor(private readonly traineeService: TraineeService) {}

  @Get()
  getTraineeIndex() {
    const contentIndex = this.traineeService
      .getTraineeIndex()
      .then((result: Trainee[]) => result)
      .catch((err: MongooseError) => {
        console.log(err);
      });
    return contentIndex;
  }

  @Get('/:id')
  getTraineeById(@Param() param: { id: string }) {
    const trainee = this.traineeService
      .getTraineeById(param.id)
      .then((result: Trainee | null) => {
        return result;
      })
      .catch((err: MongooseError) => {
        console.log(err);
      });

    return trainee;
  }

  @Post()
  create(@Body() body: Trainee, @Res() res: Response) {
    console.log(body);
    this.traineeService
      .insertToMongo(body)
      .then((result) => {
        res.statusCode = 201;
        res.json({
          status: res.statusCode,
          message: result,
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
  update(
    @Param() param: { id: string },
    @Body() body: Trainee,
    @Res() res: Response,
  ) {
    const trainee = this.traineeService
      .update(param.id, body)
      .then((result) => {
        res.statusCode = 200;
        res.json({
          status: res.statusCode,
          message: result,
        });
      })
      .catch((err: MongooseError) => {
        console.log(err);
        res.statusCode = 400;
        res.json({
          status: res.statusCode,
          message: err,
        });
      });

    return trainee;
  }

  @Delete('/:id')
  delete(@Param() param: { id: string }) {
    const trainee = this.traineeService
      .delete(param.id)
      .then((result) => {
        return result;
      })
      .catch((err: MongooseError) => {
        console.log(err);
      });

    return trainee;
  }
}
