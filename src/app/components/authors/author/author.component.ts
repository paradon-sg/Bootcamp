import { Component, inject, input, OnInit, output } from '@angular/core';
import { Author } from '../../../interfaces/author';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorsService } from '../../../services/authors.service';

@Component({
  selector: 'app-author',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authorsService = inject(AuthorsService);

  public author = input<Author | null>(null);

  public saved = output<Author>();
  public closed = output<void>();

  public authorForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    const author = this.author();
    if (author) {
      this.authorForm.patchValue(author);
    }
  }

  public closeDialog(): void {
    this.closed.emit();
  }

  public submit(): void {
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();
      return;
    }

    const value = this.authorForm.value;
    const existingAuthor = this.author();

    if (existingAuthor) {
      this.authorsService.update(existingAuthor.id, value).subscribe({
        next: (author) => {
          this.saved.emit(author);
        },
        error: (error) => {
          console.error('Error updating author:', error);
        },
      });
    } else {
      this.authorsService.create(value).subscribe({
        next: (author) => {
          this.saved.emit(author);
        },
        error: (error) => {
          console.error('Error creating author:', error);
        },
      });
    }
  }
}
