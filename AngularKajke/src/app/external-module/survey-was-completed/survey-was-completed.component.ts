import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-was-completed',
  templateUrl: './survey-was-completed.component.html',
  styleUrls: ['./survey-was-completed.component.css']
})
export class SurveyWasCompletedComponent implements OnInit {
  link: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // pobranie zmiennej z sciezki
    this.route.queryParams.subscribe(params => this.link = params.link);
  }

  fillSurveyAgain() {
    this.router.navigate(['/survey'], { queryParams: { link: this.link } });
  }
}
