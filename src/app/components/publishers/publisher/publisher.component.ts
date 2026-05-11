import { Component, inject, input, OnInit, output } from '@angular/core';
import { Publisher } from '../../../interfaces/publisher';
import { PublishersService } from '../../../services/publishers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css',
})
export class PublisherComponent implements OnInit {
  private publishersService = inject(PublishersService);
  private fb = inject(FormBuilder);

  public publisher = input<Publisher | null>(null);

  public publisherForm: FormGroup;

  public saved = output<Publisher>();
  public closed = output<void>();

  public closeDialog() {
    this.closed.emit();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.publisherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    const publisher = this.publisher();
    if (publisher) {
      this.publisherForm.patchValue(publisher);
    }
  }

  public submit() {
    if (this.publisherForm.invalid) {
      this.publisherForm.markAllAsTouched();
      return;
    }

    const value = this.publisherForm.value;
    const existingPublisher = this.publisher();

    if (existingPublisher) {
      this.publishersService.update(existingPublisher.id, value).subscribe({
        next: (publisher) => {
          this.saved.emit(publisher);
        },
        error: (err) => {
          console.error('Error updating publisher:', err);
        },
      });
    } else {
      this.publishersService.create(value).subscribe({
        next: (publisher) => {
          this.saved.emit(publisher);
        },
        error: (err) => {
          console.error('Error creating publisher:', err);
        },
      });
    }
  }
}
