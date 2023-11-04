import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trainee } from './trainee.model';
import { Model } from 'mongoose';

@Injectable()
export class TraineeService {
  constructor(
    @InjectModel('Trainee') private readonly traineeModel: Model<Trainee>,
  ) {}

  getTraineeIndex(): any {
    return this.traineeModel.find();
  }

  /**
   * Retrieves a single Trainee resource
   * @param id: String, Id of trainee
   */
  getTraineeById(id: string): any {
    return this.traineeModel.findById(id);
  }

  /**
   * Insert trainee into MongoDB
   * @param trainee Trainee to be inserted in to mongo
   */
  insertToMongo(trainee: Trainee) {
    const result = this.traineeModel.create(trainee);
    return result;
  }

  /**
   * Updates the questions, such as deleting or creating new questions
   * @param id: String, MongoDB document id
   */
  update(id: string, trainee: Trainee) {
    return this.traineeModel.findOneAndUpdate({ _id: id }, trainee, {
      upsert: false,
      new: true,
    });
  }

  /**
   * Deletes trainee
   * @param id: String, ID of trainee
   */
  delete(id: string) {
    return this.traineeModel.findOneAndDelete({ _id: id }, { new: true });
  }
}
