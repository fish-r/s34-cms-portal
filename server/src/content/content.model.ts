export interface Content {
  id: string;
  ownerId: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  processingStartedAt: Date;
  processingEndedAt: Date;
  isProcessed: boolean;
  s3Key: string;
  questions: Question[];
  classifiedRoles: string[];
}

interface Question {
  id: string;
  parentId: string;
  questionTitle: string;
  questionDescription: string;
  answerToQuestion: string;
  classifiedRole: string;
}
