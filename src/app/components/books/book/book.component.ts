import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { Publisher } from '../../../interfaces/publisher';
import { CategoriesService } from '../../../services/categories.service';
import { PublishersService } from '../../../services/publishers.service';
import { BooksService } from '../../../services/books.service';
import { Author } from '../../../interfaces/author';
import { AuthorsService } from '../../../services/authors.service';

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookService = inject(BooksService);
  private categoriesService = inject(CategoriesService);
  private publishersService = inject(PublishersService);
  private authorsService = inject(AuthorsService);

  public book = input<Book | null>(null);
  public saved = output<Book>();
  public closed = output<void>();

  public categories = signal<Category[]>([]);
  public publishers = signal<Publisher[]>([]);
  public authors = signal<Author[]>([]);

  public bookForm: FormGroup;

  ngOnInit(): void {
    this.loadPublishers();
    this.loadCategories();
    this.loadAuthors();

    this.initForm();
  }

  private initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category_id: [null, Validators.required],
      publisher_id: [null, Validators.required],
      author_ids: [[]],
    });

    const book = this.book();
    if (book) {
      const authorIds = book.authors.map((author: Author) => author.id);
      this.bookForm.patchValue({ ...book, author_ids: authorIds });
    }
  }

  private loadCategories(): void {
    this.categoriesService.categories({ per_page: 1000 }).subscribe({
      next: (categories) => {
        this.categories.set(categories.data);
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      },
    });
  }

  private loadPublishers(): void {
    this.publishersService.publishers({ per_page: 1000 }).subscribe({
      next: (publishers) => {
        this.publishers.set(publishers.data);
      },
      error: (err) => {
        console.error('Failed to load publishers', err);
      },
    });
  }

  private loadAuthors(): void {
    this.authorsService.authors({ per_page: 1000 }).subscribe({
      next: (authors) => {
        this.authors.set(authors.data);
      },
      error: (err) => {
        console.error('Failed to load authors', err);
      },
    });
  }

  public closeDialog(): void {
    this.closed.emit();
  }

  public submit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const value = this.bookForm.value;
    const existingBook = this.book();

    if (existingBook) {
      this.bookService.update(existingBook.id, { book: value }).subscribe({
        next: (book) => {
          this.saved.emit(book);
        },
        error: (err) => {
          console.error('Failed to update book', err);
        },
      });
    } else {
      this.bookService.create({ book: value }).subscribe({
        next: (book) => {
          this.saved.emit(book);
        },
        error: (err) => {
          console.error('Failed to save book', err);
        },
      });
    }
  }
}
