import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {BlocklistService} from '../../global/services/blocklist.service';
import {Observable} from 'rxjs';
import {Website} from '../../global/model/website';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../global/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @ViewChild('modal') modal: ConfirmModalComponent;
  websites$: Observable<Website[]>;
  isOpen = false;

  constructor(public auth: AuthService, private blockListService: BlocklistService, private router: Router) {
  }

  ngOnInit(): void {
    this.websites$ = this.blockListService.allElements;
    this.blockListService.getListOfElements();
  }

  goToCrud(id?: string): void {
    this.router.navigate([id ? `crud/${id}` : 'crud/']);
  }

  handleDelete(website: Website): void {
    this.isOpen = true;
    this.modal.item = website;
    this.modal.bodyText = `Are you sure to delete ${website.website}`;
  }

  confirmDelete(id: string): void {
    this.blockListService.deleteElement(id);
    this.isOpen = false;
  }

}
