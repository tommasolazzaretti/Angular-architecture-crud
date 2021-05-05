import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {fromWebsiteActions, loadWebsites} from '../actions/website.actions';
import {BlocklistService} from '../../global/services/blocklist.service';

@Injectable()
export class WebsiteEffects {

  loadWebsites$ = createEffect(() => this.actions$.pipe(
    ofType(fromWebsiteActions.loadWebsites),
    mergeMap(() => this.websiteService.loadItemList()
      .pipe(
        map(result => fromWebsiteActions.loadWebsitesSuccess({data: result})),
        catchError((err) => of(fromWebsiteActions.loadWebsiteFail(err)))
      )
    )
  ));

  loadWebsite$ = createEffect(() => this.actions$.pipe(
    ofType(fromWebsiteActions.loadWebsite),
    mergeMap((action: any) => this.websiteService.getSingleItem(action.id)
      .pipe(
        map(result => fromWebsiteActions.loadWebsiteSuccess({item: result})),
        catchError((err) => of(fromWebsiteActions.loadWebsitesFail(err)))
      )
    )
  ));

  saveWebsite$ = createEffect(() => this.actions$.pipe(
    ofType(fromWebsiteActions.saveWebsite),
    mergeMap(action => this.websiteService.addItem(action.data)
      .pipe(
        map(result => fromWebsiteActions.saveWebsiteSuccess({data: result})),
        catchError((err) => of(fromWebsiteActions.saveWebsiteFail(err)))
      )
    )
  ));

  deleteWebsite$ = createEffect(() => this.actions$.pipe(
    ofType(fromWebsiteActions.deleteWebsite),
    mergeMap((action) => this.websiteService.deleteItem(action.id)
      .pipe(
        map(() => fromWebsiteActions.deleteWebsiteSuccess({id: action.id})),
        catchError((err) => of(fromWebsiteActions.deleteWebsiteFail(err)))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private websiteService: BlocklistService
  ) {
  }
}
