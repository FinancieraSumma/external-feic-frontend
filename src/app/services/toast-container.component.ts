import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <!-- toast-container.component.ts -->
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="toast.autohide ?? true"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)"
    >
      <!-- Header -->
      <ng-template ngbToastHeader *ngIf="toast.header">
        <strong class="me-auto">{{ toast.header }}</strong>
      </ng-template>

      <!-- Close Button Positioned Absolutely -->
      <button
        *ngIf="!toast.autohide"
        type="button"
        class="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close"
        (click)="toastService.remove(toast)"
      ></button>

      <!-- Toast Body -->
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>
      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  styleUrls: ['./toast-container.component.css'],
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
