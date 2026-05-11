import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/book';
import { BookComponent } from './book/book.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [PaginationComponent, BookComponent, ConfirmationComponent, DatePipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  private booksService = inject(BooksService);

  public books = signal<Book[]>([]);
  public book = signal<Book | null>(null);

  public isBookDialogOpen = signal<boolean>(false);
  public isConfirmationDialogOpen = signal<boolean>(false);

  public pagination = signal({
    page: 1,
    per_page: 10,
    size: 0,
    total_pages: 0,
  });

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    const params = {
      page: this.pagination().page,
      per_page: this.pagination().per_page,
    };

    this.booksService.books(params).subscribe({
      next: (books) => {
        this.books.set(books.data);
        this.pagination.set(books.pagination);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public pageChange(page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, page }));
    this.loadBooks();
  }

  public perPageChange(per_page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, per_page }));
    this.loadBooks();
  }

  public openBookDialog(book: Book | null = null): void {
    this.book.set(book);
    this.isBookDialogOpen.set(true);
  }

  public closeBookDialog(): void {
    this.isBookDialogOpen.set(false);
    this.book.set(null);
  }

  public openConfirmationDialog(book: Book | null = null): void {
    this.isConfirmationDialogOpen.set(true);
    this.book.set(book);
  }

  public closeConfirmationDialog(): void {
    this.isConfirmationDialogOpen.set(false);
    this.book.set(null);
  }

  public saved(book: Book): void {
    const existingBook = this.books().find((b) => b.id === book.id);
    if (existingBook) {
      this.books.update((books) => books.map((b) => (b.id === book.id ? book : b)));
    } else {
      this.loadBooks();
    }
    this.closeBookDialog();
  }

  public confirmDelete(): void {
    const book = this.book();
    if (book) {
      this.booksService.delete(book.id).subscribe({
        next: () => {
          this.pagination.update((pagination) => ({ ...pagination, page: 1 }));
          this.loadBooks();
          this.closeConfirmationDialog();
        },
        error: (err) => {
          console.error('Failed to delete book', err);
          this.closeConfirmationDialog();
        },
      });
    }
  }
}
