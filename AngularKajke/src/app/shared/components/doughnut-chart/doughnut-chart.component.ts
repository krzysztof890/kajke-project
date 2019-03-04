import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {
  @Input()
  doughnutChartLabels: string[];
  @Input()
  doughnutChartData: number[];
  @Input()
  title: string;
  formattedLabels: string[];
  public doughnutChartType = 'doughnut';
  options: any;

  constructor() {
  }

  ngOnInit() {
    this.options = {
      legend: {
        display: false,
        labels: {
          fontSize: 14
        }
      },
    };
    this.formattedLabels = this.formatLabels(this.doughnutChartLabels);
    // this.doughnutChartLabels.forEach( label => {
    //   this.formattedLabels.push(this.formatLabel(label, this.maxLabelSize));
    // });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  formatLabels(labels: string[]) {
    const result = [];
    for (let i = 0; i < labels.length; i++) {
      result.push((i + 1) + ' ' + labels[i].substring(0, 70) + '.... ');
    }
    return result;
  }
  /**
   * Dzieli za długie etykiety na mniejsze
   * @param label etykieta
   * @param maxwidth maksymalna długosc etykiety
   */
  // formatLabel(label: string, maxwidth: number): string[] {
  //   const words = label.split(' ');
  //   let result = [];
  //   let currentLine = '';

  //   words.forEach( word => {
  //     // sprawdz czy nie trzeba łamać słowa
  //     if (word.length > maxwidth) {
  //       const tmp = result.concat(this.breakWord(currentLine + word, maxwidth));
  //       result = tmp;
  //       currentLine = result.last();
  //       return;
  //     }
  //     if ((currentLine.length + word.length) <= maxwidth) {
  //       currentLine += word;
  //     } else {
  //       result.push(currentLine);
  //       currentLine = '';
  //     }
  //   });
  //   if ( currentLine.trim().length > 0) {
  //      result.push(currentLine);
  //   }
  //   return result;
  // }
  // breakWord(word: string, maxwidth: number ): string[] {
  //   const result = [];
  //   const lines = Math.floor(word.length / maxwidth);
  //   const lastLineSize = word.length % maxwidth;
  //     for (let i = 0; i < lines; i++) {
  //       result.push(word.substring(i * maxwidth, (i + 1) * maxwidth ));
  //     }
  //     if (lastLineSize !== 0) {
  //       result.push(word.substring(lines * maxwidth, (lines * maxwidth) + lastLineSize));
  //     }
  //     return result;
  // }
}
