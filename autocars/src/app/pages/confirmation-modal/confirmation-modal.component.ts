import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass']
})
export class ConfirmationModalComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  message: string;

  closeModal(): void {
    this.onClose.emit(false);
  }

  confirmAction(): void {
    this.onClose.emit(true);
  }
}