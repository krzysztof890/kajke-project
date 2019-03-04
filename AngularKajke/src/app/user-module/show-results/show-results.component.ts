import { SurveyResult } from './../../shared/Models/survey-results';
import { Question } from './../../shared/Models/question';
import { Component, OnInit, Input } from '@angular/core';
import { AnswerType } from '../../shared/Models/answer-type.enum';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {
  @Input()
  question: Question;
  @Input()
  surveyResults: SurveyResult[];
  results: number[];

  constructor() {
  }

  ngOnInit() {
    if (this.question.AnswerType.toString() !== AnswerType.Tekstowy.toString()) {
      this.results = [];
      // posortuj wyniki
      this.surveyResults.sort((a, b) => {
        if (a.answerNumber < b.answerNumber) {
          return -1;
        } else {
          return 1;
        }
      });
      // nastepnie dodaj je do nowej tablicy aby potem przekaz je do wykresu
      this.surveyResults.forEach(item => this.results.push(item.answerCounter));
    }
  }
}
