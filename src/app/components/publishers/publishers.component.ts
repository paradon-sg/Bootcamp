import { Component, inject, OnInit, signal } from '@angular/core';
import { Publisher } from '../../interfaces/publisher';
import { Pagination } from '../../interfaces/pagination';
import { PublishersService } from '../../services/publishers.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { PublisherComponent } from './publisher/publisher.component';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-publishers',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PaginationComponent,
    PublisherComponent,
    ConfirmationComponent,
  ],
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.css',
})
export class PublishersComponent implements OnInit {
  private publishersService = inject(PublishersService);

  public publishers = signal<Publisher[]>([]);
  public publisher = signal<Publisher | null>(null);

  public isPublisherDialogOpen = signal<boolean>(false);
  public isConfirmationDialogOpen = signal<boolean>(false);

  public pagination = signal<Pagination>({
    page: 1,
    per_page: 10,
    total_pages: 0,
    size: 0,
  });

  public publisherForm: FormGroup;

  ngOnInit(): void {
    this.loadPublishers();
  }

  private loadPublishers(): void {
    const params = {
      page: this.pagination().page,
      per_page: this.pagination().per_page,
    };
    this.publishersService.publishers(params).subscribe({
      next: (response) => {
        this.publishers.set(response.data);
        this.pagination.set(response.pagination);
      },
      error: (error) => {
        console.error('Error fetching publishers:', error);
      },
    });
  }

  public openConfirmationDialog(publisher: Publisher | null = null): void {
    this.isConfirmationDialogOpen.set(true);
    this.publisher.set(publisher);
  }

  public closeConfirmationDialog(): void {
    this.isConfirmationDialogOpen.set(false);
    this.publisher.set(null);
  }

  public openPublisherDialog(publisher: Publisher | null = null): void {
    this.isPublisherDialogOpen.set(true);
    this.publisher.set(publisher);
  }

  public closePublisherDialog(): void {
    this.isPublisherDialogOpen.set(false);
    this.publisher.set(null);
  }

  public confirmDelete(): void {
    const publisher = this.publisher();
    if (publisher) {
      this.publishersService.delete(publisher.id).subscribe({
        next: () => {
          this.loadPublishers();
          this.closeConfirmationDialog();
        },
        error: (error) => {
          console.error('Error deleting publisher:', error);
        },
      });
    }
  }

  public pageChange(page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, page }));
    this.loadPublishers();
  }

  public perPageChange(per_page: number): void {
    this.pagination.update((pagination) => ({ ...pagination, per_page }));
    this.loadPublishers();
  }

  public saved(publisher: Publisher): void {
    const existingPublisher = this.publishers().find((p) => p.id === publisher.id);
    if (existingPublisher) {
      this.publishers.update((publishers) =>
        publishers.map((p) => (p.id === publisher.id ? publisher : p)),
      );
    } else {
      this.loadPublishers();
    }
    this.closePublisherDialog();
  }
}
