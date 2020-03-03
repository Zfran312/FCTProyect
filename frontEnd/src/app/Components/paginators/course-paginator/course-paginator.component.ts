import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'course-paginator-nav',
  templateUrl: './course-paginator.component.html',
  styleUrls: ['./course-paginator.component.css']
})
export class CoursePaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any;

  paginas: number[];
  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

    this.desde = Math.min(Math.max(1, this.paginator.number - 3), this.paginator.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 5), 6);

    if (this.paginator.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }

}
