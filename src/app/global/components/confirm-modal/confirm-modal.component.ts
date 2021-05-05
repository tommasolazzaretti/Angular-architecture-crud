import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit {

  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Input() title: string;
  @Input() bodyText: string;
  @Input() isOpen: boolean;
  @Input() item: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleConfirm(): void {
    this.confirm.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
