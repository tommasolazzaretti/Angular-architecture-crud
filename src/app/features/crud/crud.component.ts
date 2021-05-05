import {Component, OnInit} from '@angular/core';
import {Website} from '../../global/model/website';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BlocklistService} from '../../global/services/blocklist.service';
import {AppState} from '../../app.module';
import {select, Store} from '@ngrx/store';
import {fromWebsiteActions} from '../../store/actions/website.actions';
import {getWebsiteById} from '../../store/selectors/website.selector';

const regExWebsite =
  new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  website: Website;
  private id = null;
  crudForm = new FormGroup({
    name: new FormControl('', Validators.required),
    website: new FormControl('',
      [
        Validators.required,
        Validators.pattern(regExWebsite)
      ],
    )
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocklistService: BlocklistService,
    private store: Store<AppState>
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.store.dispatch(fromWebsiteActions.loadWebsite({id: params.id}));
      }
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    const self = this;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.store.pipe(select(getWebsiteById())).subscribe((website) => {
          self.crudForm?.get('name')?.setValue(website?.name);
          self.crudForm?.get('website')?.setValue(website?.website);
        });
      }
    });
  }

  saveWebsite(): void {
    if (this.crudForm.invalid) {
      this.crudForm.markAsTouched();
    } else {
      const param = this.id ? {id: this.id, ...this.crudForm.value} : this.crudForm.value;
      this.store.dispatch(fromWebsiteActions.saveWebsite({data: param}));
      this.router.navigate(['']);
    }
  }

}
