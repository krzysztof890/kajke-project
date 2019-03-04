import { Question } from './../../shared/Models/question';
import { ValidationsOptions } from './../../shared/validators/validations-options';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Survey } from './../../shared/Models/survey';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnswerType } from '../../shared/Models/answer-type.enum';
import { SurveyService } from '../../shared/services/survey.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-new-survey',
  templateUrl: './create-new-survey.component.html',
  styleUrls: ['./create-new-survey.component.css']
})
export class CreateNewSurveyComponent implements OnInit, OnDestroy {
  options = AnswerType;
  subs: Subscription[] = [];
  @Input()
  survey: Survey; // model ankiety
  @Input()
  link: string; // identyfikagor ankiety
  isRequesting = false;
  editingMode = false;
  surveyWasEdited = false;
  surveyForm: FormGroup;
  validationsOptions: any;

  maxLengthOfTheAnswer = ValidationsOptions.MaxLengthOfTheAnswer;
  surveyDescriptionMmaxLength = ValidationsOptions.SurveyDescriptionMmaxLength;
  surveyNameMmaxLength = ValidationsOptions.SurveyNameMmaxLength;
  surveyQuestionMmaxLength = ValidationsOptions.SurveyQuestionMmaxLength;

  constructor(private formBuilder: FormBuilder, private surveyService: SurveyService, private router: Router) {
  }

  // getters
  get Questions() {
    return this.surveyForm.get('Questions') as FormArray;
  }

  get Name() {
    return this.surveyForm.get('Name');
  }

  get Description() {
    return this.surveyForm.get('Description');
  }

  ngOnInit() {
    // jesi to jest nowa ankieta zaicjalizuj forme postawowymi wartosciami
    if (this.survey === undefined) {
      this.surveyForm = this.formBuilder.group({
        Name: ['', [Validators.required]],
        Description: ['', [Validators.required]],
        Questions: this.formBuilder.array([])
      });
      this.addQuestion();
    } else { // kiesy jest to edycja aniety zapelnij forme danymi
      this.editingMode = true;
      this.surveyForm = this.formBuilder.group({
        Name: [this.survey.Name, [Validators.required]],
        Description: [this.survey.Description, [Validators.required]],
        Questions: this.formBuilder.array([])
      });
      this.survey.Questions.forEach(item => {
        const answers = [];
        if (item.AnswerType != AnswerType.Tekstowy) {
          item.Answers.forEach(answer => {
            answers.push(this.formBuilder.group({
              Answer: [answer, [Validators.required]]
            }));
          });
        }
        const question = this.formBuilder.group({
          Query: [item.Query, [Validators.required]],
          AnswerType: item.AnswerType.toString(),
          Answers: this.formBuilder.array(answers),
          IsOptional: [item.IsOptional]
        });
        this.Questions.push(question);
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
  /**
   * Dodaj now pytanie ankiety
   */
  addQuestion(): void {
    this.surveyWasEdited = true;
    const question = this.formBuilder.group({
      Query: ['', [Validators.required]],
      AnswerType: AnswerType.Jednokrotny.toString(),
      Answers: this.formBuilder.array([]),
      IsOptional: [false]
    });
    this.addAnswer(question.get('Answers') as FormArray);
    this.Questions.push(question);
  }

  /**
   * Usuń wybrane pytanie
   * @param index Nr pytania - 1
   */
  remoweQuestionAt(index: number): void {
    if (this.Questions.length > 1) {
      this.surveyWasEdited = true;
      this.Questions.removeAt(index);
    }
  }

  /**
   * Usuń ostatnie pytanie
   */
  remoweQuestion(): void {
    if (this.Questions.length > 1) {
      this.surveyWasEdited = true;
      this.Questions.removeAt(this.Questions.length - 1);
    }
  }

  /**
   * Dodaj nowe pytanie na koniec bloku
   * @param answers
   */
  addAnswer(answers: FormArray): void {
    this.surveyWasEdited = true;
    const answer = this.formBuilder.group({
      Answer: ['', [Validators.required]]
    });
    answers.push(answer);
  }

  /**
   * Pobierz kolekcje odpwoiedzi danego pytania
   * @param question Okreslone pytanie ankiety z formy
   */
  GetAnswers(question: FormGroup): FormArray {
    return question.get('Answers') as FormArray;
  }

  /**
   * Usuń wybrana odpowiedz
   * @param question Okreslone pytanie ankiety z formy
   * @param index nr pytania
   */
  deleteAnswer(question: FormGroup, index: number) {
    const answers = this.GetAnswers(question);
    if (answers.length > 1) {
      this.GetAnswers(question).removeAt(index);
    }
  }

  /**
   * Obsługa zdarzenia zmiany tpya pytania przez input select
   * @param question wyrane pytanei z formy
   */
  onSelectChange(question: FormGroup) {
    this.surveyWasEdited = true;
    const answerType = question.get('AnswerType').value;
    const answers = this.GetAnswers(question);
    if (AnswerType.Tekstowy == answerType) {
      const length = answers.length;
      for (let i = length - 1; i >= 0; i--) {
        answers.removeAt(i);
      }
    } else {
      if (answers.length === 0) {
        this.addAnswer(answers);
      }
    }
  }

  onSubmit() {
    if (this.editingMode && this.surveyWasEdited) {
      if (!confirm('Zmiana struktury ankiety spowoduje utrate dotykczas zebranych danych. Jesteś tego pewien?')) {
        return;
      }
    }
    const questions = [];
    for (let i = 0; i < this.surveyForm.value.Questions.length; i++) {
      const tmp = new Question({
        AnswerType: this.surveyForm.value.Questions[i].AnswerType,
        IsOptional: this.surveyForm.value.Questions[i].IsOptional,
        Query: this.surveyForm.value.Questions[i].Query,
        QuestionNumber: i + 1,
      });
      if (tmp.AnswerType != AnswerType.Tekstowy) {
        const answers = [];
        this.surveyForm.value.Questions[i].Answers.forEach(answer => {
          answers.push(answer.Answer);
        });
        tmp.Answers = answers;
      }
      questions.push(tmp);
    }
    const survey = new Survey({
      Name: this.surveyForm.value.Name,
      Description: this.surveyForm.value.Description,
      Questions: questions
    });
    this.isRequesting = true;
    if (this.editingMode) {
      this.surveyService.editSurvey(this.link, survey.toJSON(), this.surveyWasEdited)
        .pipe(catchError(this.surveyService.handleErrors), finalize(() => this.isRequesting = false)).subscribe(
          res => {
            if (res) { // kiedy udalo sie utworzyc ankiete
              alert('Twoja ankieta została edytowana!');
              this.router.navigate(['/user/surveys']);
            }
          },
          error => { // kiedy nie udalo sie utworzc ankiety na serwerze
            alert(error);
          });
    } else {
      this.surveyService.createSurvey(survey.toJSON()).pipe(catchError(this.surveyService.handleErrors),
        finalize(() => this.isRequesting = false)).subscribe(
          res => {
            if (res) { // kiedy udalo sie utworzyc ankiete
              alert('Twoja ankieta została utworzona!');
              this.router.navigate(['/user/surveys']);
            }
          },
          error => { // kiedy nie udalo sie utworzc ankiety na serwerze
            alert(error);
          });
    }
  }
}
