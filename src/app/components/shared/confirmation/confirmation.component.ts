import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent {
  public title = input<string>('');
  public message = input<string>('');

  public confirmed = output<void>();
  public cancelled = output<void>();

  public confirm(): void {
    this.confirmed.emit();
  }

  public cancel(): void {
    this.cancelled.emit();
  }
}
