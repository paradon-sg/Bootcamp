import { AuthorsService } from './../../services/authors.service';
import { Component, inject, signal } from '@angular/core';
import { Author } from '../../interfaces/author';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';
import { AuthorComponent } from './author/author.component';

@Component({
  selector: 'app-authors',
  imports: [DatePipe, PaginationComponent, ConfirmationComponent, AuthorComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent {
  private authorsService = inject(AuthorsService);

  public authors = signal<Author[]>([]);
  public author = signal<Author | null>(null);

  public isAuthorDialogOpen = signal<boolean>(false);
  public isConfirmationDialogOpen = signal<boolean>(false);

  public pagination = signal({
    page: 1,
    per_page: 10,
    size: 0,
    total_pages: 0,
  });

  ngOnInit(): void {
    this.loadAuthors();
  }

  private loadAuthors(): void {
    const params = {
      page: this.pagination().page,
      per_page: this.pagination().per_page,
    };

    this.authorsService.authors(params).subscribe({
      next: (authors) => {
        this.authors.set(authors.data);
        this.pagination.set(authors.pagination);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  public pageChange(page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, page }));
    this.loadAuthors();
  }

  public perPageChange(per_page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, per_page }));
    this.loadAuthors();
  }

  public confirmDelete(): void {
    const author = this.author();
    if (author) {
      this.authorsService.delete(author.id).subscribe({
        next: () => {
          this.pagination.update((pagination) => ({ ...pagination, page: 1 }));
          this.loadAuthors();
          this.closeConfirmationDialog();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  public openConfirmationDialog(author: Author | null = null): void {
    this.author.set(author);
    this.isConfirmationDialogOpen.set(true);
  }

  public closeConfirmationDialog(): void {
    this.isConfirmationDialogOpen.set(false);
    this.author.set(null);
  }

  public openAuthorDialog(author: Author | null = null): void {
    this.author.set(author);
    this.isAuthorDialogOpen.set(true);
  }

  public closeAuthorDialog(): void {
    this.isAuthorDialogOpen.set(false);
    this.author.set(null);
  }

  public saved(author: Author): void {
    const existingAuthor = this.authors().find((a) => a.id === author.id);
    if (existingAuthor) {
      this.authors.update((authors) => authors.map((a) => (a.id === author.id ? author : a)));
    } else {
      this.loadAuthors();
    }
    this.closeAuthorDialog();
  }
}
