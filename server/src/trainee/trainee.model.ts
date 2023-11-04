import mongoose from 'mongoose';

/**
 * Interfaces
 */

export interface Trainee {
  firstName: string;
  lastName: string;
  age: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  learningStyle: LearningStyle;
  learningStage: LearningStage;
}

export interface LearningStyle {
  accommodating: number;
  diverging: number;
  assimilating: number;
  converging: number;
}

export interface LearningStage {
  experience: number;
  observation: number;
  conceptualisation: number;
  experimentation: number;
}

/**
 * Samples
 */
// TODO: removed when done testing
export const sampleTrainee1: Trainee = {
  firstName: 'Yufan',
  lastName: 'Test',
  age: 24,
  learningStage: {
    conceptualisation: 0.4,
    experience: 0,
    observation: 0,
    experimentation: 0,
  },
  learningStyle: {
    accommodating: 0.4,
    assimilating: 0.1,
    converging: 0.3,
    diverging: 0.4,
  },
};

/**
 * Trainee Schema for creating a MongoDB Document
 */
export const TraineeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, required: false },
  lastUpdatedAt: { type: Date, required: false },
  learningStage: {
    experience: { type: Number, required: true },
    observation: { type: Number, required: true },
    conceptualisation: { type: Number, required: true },
    experimentation: { type: Number, required: true },
  },
  learningStyle: {
    accommodating: { type: Number, required: true },
    assimilating: { type: Number, required: true },
    converging: { type: Number, required: true },
    diverging: { type: Number, required: true },
  },
}).index({ firstName: 1, lastName: 1 }, { unique: true });
