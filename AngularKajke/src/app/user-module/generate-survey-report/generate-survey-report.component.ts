import { ExcelService } from './../../shared/services/excel-service.service';
import { Question } from './../../shared/Models/question';
import { SurveyService } from './../../shared/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { SurveyResults } from './../../shared/Models/survey-results';
import { Survey } from './../../shared/Models/survey';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AnswerType } from '../../shared/Models/answer-type.enum';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-generate-survey-report',
  templateUrl: './generate-survey-report.component.html',
  styleUrls: ['./generate-survey-report.component.css']
})
export class GenerateSurveyReportComponent implements OnInit, OnDestroy {
  survey: Survey;
  result: SurveyResults;
  isRequesting: boolean;
  link: string; // identyfikator ankiety
  subs: Array<Subscription> = [];
  error: string;
  questionToReport: Question[] = [];
  @ViewChild('content')
  content: ElementRef;

  constructor(private route: ActivatedRoute, private surveyService: SurveyService, private excelService: ExcelService) {
  }

  ngOnInit() {
    this.isRequesting = true;
    // pobranie zmiennej z sciezki
    this.subs.push(this.route.queryParams.subscribe(params => this.link = params.link));
    // pobranie ankiety
    this.subs.push(this.surveyService.getSurvey(this.link)
      .pipe(catchError(this.surveyService.handleErrors), finalize(() => this.onCompleting()))
      .subscribe(res => {
        this.survey = res as Survey;
      },
        error => {
          this.error += error;
          this.isRequesting = false;
        }));
    // pobranie wynikow ankiety
    this.subs.push(this.surveyService.getSurveyResults(this.link)
      .pipe(catchError(this.surveyService.handleErrors), finalize(() => this.onCompleting()))
      .subscribe(res => {
        this.result = res as SurveyResults;
      },
        error => {
          this.error += error;
          this.isRequesting = false;
        }));
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Sprawdza czy dane zostały juz pobrane
   */
  onCompleting() {
    if (this.survey !== undefined && this.result !== undefined) {
      this.isRequesting = false;
    }
  }

  onCheckboxChange(value: Question) {
    const index = this.questionToReport.lastIndexOf(value);
    if (index === -1) {
      this.questionToReport.push(value);
    } else {
      this.questionToReport.splice(index, 1);
    }
  }

  geTotalQuestionScore(question: Question): number {
    const results = this.result.results.filter(score => score.questionNumber === question.QuestionNumber);
    let totalScore = 0;
    if (question.AnswerType == AnswerType.Tekstowy) {
      totalScore = results[0].answerResults.length;
    } else {
      results.forEach(result => totalScore += result.answerCounter);
    }
    return totalScore;
  }
  getScore(questionNumber: number, aswerNumber: number): number {
    const result = this.result.results.filter(score => score.questionNumber === questionNumber
      && score.answerNumber === aswerNumber)[0];
    if (result !== undefined) {
      return result.answerCounter;
    } else {
      return 0;
    }
  }

  getAnswers(questionNumber: number): string[] {
    const result = this.result.results.filter(score => score.questionNumber === questionNumber)[0];
    return result.answerResults;
  }

  generateReport() {
    const pdfContent = [];
    // header
    pdfContent.push({ text: 'Raport dla Ankiety:', style: ['header', 'center'] });
    pdfContent.push({ text: this.survey.Name, style: ['header', 'center'] });
    // body, przeiteruj pytania ktore maja trafic do raportu
    this.questionToReport.forEach(question => {
      // nagłowek sekcji kazdego pytania
      pdfContent.push({ text: question.Query, style: ['query'] });
      pdfContent.push({
        text: 'W sumie na pytanie udzielono łącznie ' + this.geTotalQuestionScore(question) + ' odpowiedzi.',
        style: ['queryCount']
      });
      // ciało sekcji
      if (question.AnswerType != AnswerType.Tekstowy) { // przeiteruj wszystkie odpowiedzi
        for (let i = 0; i < question.Answers.length; i++) {
          pdfContent.push({ text: question.Answers[i], margin: [10, 0, 0, 10] }); // dodaj tresc odpowiedzi
          pdfContent.push({
            text: ' Udzielono ' + this.getScore(question.QuestionNumber, i + 1) + ' odpowiedzi.',
            style: ['body']
          });
        }
      } else {
        this.getAnswers(question.QuestionNumber).forEach(answer => {
          pdfContent.push({ text: answer, style: ['body'] }); // dodaj tresc udzielonej odpowiedzi na pytanie
        });
      }
    });

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const pdf = {
      content: pdfContent,
      styles: {
        center: {
          alignment: 'center'
        },
        header: {
          fontSize: 17,
          bold: true,
          margin: [0, 5, 0, 20]
        },
        query: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 15]
        },
        queryCount: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 20]
        },
        body: {
          fontSize: 11,
          margin: [10, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(pdf).download('raport.pdf');
  }

  generateExelReport() {
    const dataToExel = [];
    const textQuestionToExel = [];
    dataToExel.push([this.survey.Name]);
    this.questionToReport.forEach(item => {
      if (item.AnswerType != AnswerType.Tekstowy) {
        dataToExel.push([' '].concat(item.Answers));
        const scores = [];
        for (let index = 0; index < item.Answers.length; index++) {
          scores.push(this.getScore(item.QuestionNumber, index + 1));
        }
        dataToExel.push([item.Query].concat(scores));
      } else {
        textQuestionToExel.push([item.Query].concat(this.getAnswers(item.QuestionNumber)));
      }
    });
    this.excelService.exportArrayOfArraysAsExelFile(dataToExel.concat(this.excelService.transpose(textQuestionToExel)), 'raport');
  }
}
