import { Component, inject, input, OnInit, output } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);

  public category = input<Category | null>(null);

  public saved = output<Category>();
  public closed = output<void>();

  public categoryForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    const category = this.category();
    if (category) {
      this.categoryForm.patchValue(category);
    }
  }

  public closeDialog(): void {
    this.closed.emit();
  }

  public submit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const value = this.categoryForm.value;
    const existingCategory = this.category();

    if (existingCategory) {
      this.categoriesService.update(existingCategory.id, value).subscribe({
        next: (category) => {
          this.saved.emit(category);
        },
        error: (error) => {
          console.error('Error updating category:', error);
        },
      });
    } else {
      this.categoriesService.create(value).subscribe({
        next: (category) => {
          this.saved.emit(category);
        },
        error: (error) => {
          console.error('Error creating category:', error);
        },
      });
    }
  }
}
