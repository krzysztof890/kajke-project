import { AnswerType } from './answer-type.enum';

export class AnswerProvided {
  public constructor(init?: Partial<AnswerProvided>) {
    Object.assign(this, init);
  }
  AnswerType?: AnswerType;
  QuestionNumber?: number;
  AnswerResult: string;
  AnswerNumber: number;
}
