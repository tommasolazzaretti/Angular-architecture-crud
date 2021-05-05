import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {AppState} from '../../app.module';
import {InjectionToken} from '@angular/core';
import {WEBSITE_FEATURE_KEY, websiteReducer} from './website.reducer';

const reducers: ActionReducerMap<AppState> = {
  [WEBSITE_FEATURE_KEY]: websiteReducer
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
  'Registered Reducers',
  {
    factory: () => reducers
  }
);

export const getState = createFeatureSelector<AppState>('state');
