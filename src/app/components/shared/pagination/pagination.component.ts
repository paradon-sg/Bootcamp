import { Component, input, output } from '@angular/core';
import { Pagination } from '../../../interfaces/pagination';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  public pagination = input.required<Pagination>();
  public pageChange = output<number>();
  public perPageChange = output<number>();

  public next(): void {
    if (this.pagination().page < this.pagination().total_pages) {
      this.pageChange.emit(this.pagination().page + 1);
    }
  }

  public previous(): void {
    if (this.pagination().page > 1) {
      this.pageChange.emit(this.pagination().page - 1);
    }
  }
}
