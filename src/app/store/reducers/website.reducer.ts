import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {fromWebsiteActions} from '../actions/website.actions';
import {Website} from '../../global/model/website';
// @ts-ignore
import * as _ from 'lodash';

export const WEBSITE_FEATURE_KEY = 'website';

export interface State extends EntityState<any> {
  selectedItem?: Website | null;
  loaded: boolean;
  error?: Error | any;
}

export const adapter: EntityAdapter<Website> = createEntityAdapter<any>({
  // In this case this would be optional since primary key is id
  selectId: item => item.id
});

export const initialState: State = adapter.getInitialState({
  // Additional entity state properties
  selectedItem: null,
  loaded: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(fromWebsiteActions.loadWebsitesSuccess, (state, {data}) => {
    return adapter.setAll(data, {
      ...state,
      loaded: false
    });
  }),
  on(fromWebsiteActions.loadWebsitesFail, (state, {error}) => {
    return {
      ...state,
      loaded: false,
      error
    };
  }),
  on(fromWebsiteActions.loadWebsiteSuccess, (state, {item}) => {
    return {
      ...state,
      loaded: false,
      selectedItem: item
    };
  }),
  on(fromWebsiteActions.loadWebsiteFail, (state, {error}) => {
    return {
      ...state,
      loaded: false,
      selectedItem: null,
      error
    };
  }),
  on(fromWebsiteActions.deleteWebsiteSuccess, (state, {id}) => {
    return adapter.removeOne(id, {
      ...state,
      loaded: false
    });
  }),
  on(fromWebsiteActions.deleteWebsiteFail, (state, {error}) => {
    return {
      ...state,
      selectedItem: null,
      loaded: false,
      error
    };
  })
);

export function websiteReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
