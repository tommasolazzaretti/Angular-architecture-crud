import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {BlocklistService} from '../../global/services/blocklist.service';
import {Observable} from 'rxjs';
import {Website} from '../../global/model/website';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../global/components/confirm-modal/confirm-modal.component';
import {select, Store} from '@ngrx/store';
import {fromWebsiteActions} from '../../store/actions/website.actions';
import {selectAllWebsites} from '../../store/selectors/website.selector';

class HomeState {
  items: Website[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @ViewChild('modal') modal: ConfirmModalComponent;
  websites$: Observable<Website[]> = this.store.pipe(select(selectAllWebsites));
  isOpen = false;

  constructor(
    public auth: AuthService,
    private blockListService: BlocklistService,
    private router: Router,
    private store: Store<HomeState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromWebsiteActions.loadWebsites());
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
    this.store.dispatch(fromWebsiteActions.deleteWebsite({id}));
    this.isOpen = false;
  }

}
