import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Website} from '../../model/website';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCardComponent implements OnInit {

  @Output() confirm: EventEmitter<{id: string}> = new EventEmitter<{id: string}>();
  @Output() delete: EventEmitter<{website: Website}> = new EventEmitter<{website: Website}>();
  @Input() website: Website;

  constructor() { }

  ngOnInit(): void {
  }

  handleUpdate(): void {
    if (this.website && this.website.id) {
      this.confirm.emit({id: this.website.id});
    }
  }

  handleDelete(): void {
    if (this.website) {
      this.delete.emit({website: this.website});
    }
  }

}
