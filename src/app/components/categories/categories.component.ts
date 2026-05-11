import { Component, inject, OnInit, signal } from '@angular/core';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { Pagination } from '../../interfaces/pagination';
import { DatePipe } from '@angular/common';
import { CategoryComponent } from './category.component/category.component';

@Component({
  selector: 'app-categories',
  imports: [ConfirmationComponent, PaginationComponent, DatePipe, CategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponents implements OnInit {
  private categoriesService = inject(CategoriesService);

  public categories = signal<Category[]>([]);
  public category = signal<Category | null>(null);

  public isCategoryDialogOpen = signal<boolean>(false);
  public isConfirmationDialogOpen = signal<boolean>(false);

  public pagination = signal<Pagination>({
    page: 1,
    per_page: 10,
    size: 0,
    total_pages: 0,
  });

  public ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    const params = {
      page: this.pagination().page,
      per_page: this.pagination().per_page,
    };

    this.categoriesService.categories(params).subscribe({
      next: (response) => {
        this.categories.set(response.data);
        this.pagination.set(response.pagination);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  public openCategoryDialog(category: Category | null = null): void {
    this.category.set(category);
    this.isCategoryDialogOpen.set(true);
  }

  public closeCategoryDialog(): void {
    this.isCategoryDialogOpen.set(false);
    this.category.set(null);
  }

  public openConfirmationDialog(category: Category): void {
    this.category.set(category);
    this.isConfirmationDialogOpen.set(true);
  }
  public closeConfirmationDialog(): void {
    this.isConfirmationDialogOpen.set(false);
    this.category.set(null);
  }

  public confirmDelete(): void {
    const category = this.category();
    if (category) {
      this.categoriesService.delete(category.id).subscribe({
        next: () => {
          this.pagination.update((pagination) => ({ ...pagination, page: 1 }));
          this.loadCategories();
          this.closeConfirmationDialog();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }
  }

  public pageChange(page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, page }));
    this.loadCategories();
  }

  public perPageChange(per_page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, per_page }));
    this.loadCategories();
  }

  public saved(category: Category): void {
    const existingCategory = this.categories().find((c) => c.id === category.id);
    if (existingCategory) {
      this.categories.update((categories) =>
        categories.map((c) => (c.id === category.id ? category : c)),
      );
    } else {
      this.loadCategories();
    }
    this.closeCategoryDialog();
  }
}
