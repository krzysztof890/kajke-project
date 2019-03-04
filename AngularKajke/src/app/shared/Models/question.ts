import { AnswerType } from './answer-type.enum';

export class Question {
  public constructor(init?: Partial<Question>) {
    Object.assign(this, init);
  }
  QuestionErrors?: string;
  Query?: string;
  QuestionNumber?: number;
  AnswerType?: AnswerType;
  Answers?: string[];
  IsOptional?: boolean;
}
