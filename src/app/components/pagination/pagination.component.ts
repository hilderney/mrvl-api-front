import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InitialPaginationValues } from 'src/app/resources/consts/pagination.const';
import { IPaginationView } from 'src/app/resources/interfaces/character.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationSize: number = 0;
  @Input() pagination: IPaginationView = InitialPaginationValues;
  @Output() paginationEmit = new EventEmitter<IPaginationView>();

  constructor() { }

  ngOnInit() {
  }

  goToPage(page: number) {
    if (page < this.pagination.first || page > this.pagination.last) {
      this.pagination.page = page < this.pagination.first ?
        this.pagination.first :
        this.pagination.page = page > this.pagination.last ?
          this.pagination.last : page;
      return;
    }

    const mod = page > this.pagination.page ? 1 : -1;
    this.pagination.page = page;
    this.pagination.next = page + 1;
    this.pagination.previous = page - 1;

    this.pagination.offset = (page - 1) * this.paginationSize;

    this.paginationEmit.emit(this.pagination);
  }

}
