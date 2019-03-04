import { AnswerType } from './answer-type.enum';

export class SurveyResults {
  results: SurveyResult[];
}

export interface SurveyResult {
  answerNumber: number;
  questionNumber: number;
  answerType: AnswerType;
  answerCounter: number;
  answerResults: string[];
}
