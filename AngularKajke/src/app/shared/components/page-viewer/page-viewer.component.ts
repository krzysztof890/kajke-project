import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css']
})
export class PageViewerComponent implements OnInit {
  @Input()
  listElements: string[];
  @Input()
  title: string;
  currentListElements: string[];
  currentPage: number;
  maxPageCounter: number;
  listElementsPerPage: number;
  remainder: number;

  constructor() {
  }

  ngOnInit() {
    this.listElementsPerPage = 5;
    this.initialize();
    this.setPage();
  }

  nextPage() {
    if (this.currentPage !== this.maxPageCounter) {
      this.currentPage++;
      if (this.currentPage === this.maxPageCounter) {
        this.lastPage();
      } else {
        this.setPage();
      }
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      if (this.currentPage === 1) {
        this.firstPage();
      } else {
        this.setPage();
      }
    }
  }

  lastPage() {
    this.currentPage = this.maxPageCounter;
    const index = (this.maxPageCounter - 1) * this.listElementsPerPage;
    this.currentListElements = this.listElements.slice(index, index + this.remainder);
  }

  firstPage() {
    this.currentPage = 1;
    this.currentListElements = this.listElements.slice(this.currentPage - 1, this.listElementsPerPage);
  }

  onInputChange(event: any) {
    if (this.currentPage <= 0) {
      this.firstPage();
    } else if (this.currentPage >= this.maxPageCounter) {
      this.lastPage();
    } else {
      this.setPage();
    }
  }

  setPage() {
    const index = (this.currentPage - 1) * this.listElementsPerPage;
    this.currentListElements = this.listElements.slice(index, index + this.listElementsPerPage);
  }

  onSelectChange() {
    this.initialize();
    this.setPage();
  }

  initialize() {
    this.currentPage = 1;
    // sprawdz ile bedzie stron uzyskaj wyganae dane
    this.remainder = this.listElements.length % this.listElementsPerPage;
    if (this.remainder === 0) {
      this.maxPageCounter = this.listElements.length / this.listElementsPerPage;
      this.remainder = this.listElementsPerPage;
    } else {
      this.maxPageCounter = Math.floor(this.listElements.length / this.listElementsPerPage) + 1;
    }
  }
}
