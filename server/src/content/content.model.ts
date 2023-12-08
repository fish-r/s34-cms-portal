import mongoose from 'mongoose';

/**
 * Interfaces
 * Id is not included because MongoDB will create a uuid for us
 */
export interface Content {
  ownerId: string;
  filename: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  processingStartedAt?: Date;
  processingEndedAt?: Date;
  isProcessed: boolean;
  s3Key: string;
  questions: Question[];
  classifiedRoles: string[];
}

interface Question {
  parentId: string;
  title: string;
  description: string;
  answer: string;
  classifiedRole: string;
}

/**
 * Samples
 */
// TODO: removed when done testing
const sampleQuestion1: Question = {
  // id: '1',
  parentId: 'content1',
  title: 'Phishing Email',
  description: 'You see a random email link. Should you click it?',
  answer: 'No',
  classifiedRole: 'cyber security',
};

const sampleQuestion2: Question = {
  // id: '1',
  parentId: 'content1',
  title: 'Sustainability',
  description: 'Should you turn off the lights when exiting the office?',
  answer: 'Yes',
  classifiedRole: 'human resource',
};

export const sampleContent: Content = {
  // id: 'content1',
  ownerId: 'yufan',
  filename: 'samplefile',
  createdAt: new Date(),
  lastUpdatedAt: new Date(),
  processingStartedAt: null,
  processingEndedAt: null,
  isProcessed: false,
  s3Key: '/content/samplefile',
  questions: [sampleQuestion1, sampleQuestion2],
  classifiedRoles: ['compliance', 'cyber security', 'human resource'],
};

/**
 * Schema for MongoDB
 */
// const QuestionSchema = new mongoose.Schema({
//   parentId: { type: String, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   answer: { type: String, required: true },
//   classifiedRole: { type: String, required: true },
// });

/**
 * Content Schema for creating a MongoDB Document
 * @param ownerId String: Id of user who uploaded the content
 * @param filename String: Name of uploaded file [Must be unique]
 * @param createdAt Date: Date inserted into MongoDB
 * @param lastUpdatedAt Date: Date of last update in MongoDB
 * @param processingStartedAt Date: Date which is sent to model to generate questions
 * @param processingEndedAt Date: Date when questions are generated
 * @param isProcessed Boolean: If questions have been generated
 * @param s3Key String: Key of object saved in Amazon S3 [Must be unique]
 * @param questions Question[]: Questions generated by the Model
 * @param classifiedRoles String[]: Roles that have been classified from the content
 */
export const ContentSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  filename: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: false },
  lastUpdatedAt: { type: Date, required: false },
  processingStartedAt: { type: Date, required: false },
  processingEndedAt: { type: Date, required: false },
  isProcessed: { type: Boolean, required: true },
  s3Key: { type: String, required: true, unique: true },
  questions: { type: Array<Question>, required: false },
});
