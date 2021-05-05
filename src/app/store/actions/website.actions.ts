import {createAction, props} from '@ngrx/store';
import {Website} from '../../global/model/website';

export enum ItemsActionTypes {
  LoadWebsites = '[Website] Load Websites',
  LoadWebsitesSuccess = '[Website] Load Websites Success',
  LoadWebsitesFail = '[Website] Load Websites Fail',
  LoadWebsite = '[Website] Load Website',
  LoadWebsiteSuccess = '[Website] Load Website Success',
  LoadWebsiteFail = '[Website] Load Website Fail',
  SaveWebsite = '[Website] Save Website',
  SaveWebsiteSuccess = '[Website] Save Website Success',
  SaveWebsiteFail = '[Website] Save Website Fail',
  DeleteWebsite = '[Website] Delete Website',
  DeleteWebsiteSuccess = '[Website] Delete Website Success',
  DeleteWebsiteFail = '[Website] Delete Website Fail',
}

export const loadWebsites = createAction(
  ItemsActionTypes.LoadWebsites,
);

export const loadWebsitesSuccess = createAction(
  ItemsActionTypes.LoadWebsitesSuccess,
  props<{ data: Website[] }>()
);

export const loadWebsitesFail = createAction(
  ItemsActionTypes.LoadWebsitesFail,
  props<{ error: Error | any }>()
);

export const loadWebsite = createAction(
  ItemsActionTypes.LoadWebsite,
  props<{ id: string | number }>()
);

export const loadWebsiteSuccess = createAction(
  ItemsActionTypes.LoadWebsiteSuccess,
  props<{ item: Website }>()
);

export const loadWebsiteFail = createAction(
  ItemsActionTypes.LoadWebsiteFail,
  props<{ error: Error | any }>()
);

export const saveWebsite = createAction(
  ItemsActionTypes.SaveWebsite,
  props<{ data: Website }>()
);

export const saveWebsiteSuccess = createAction(
  ItemsActionTypes.SaveWebsiteSuccess,
  props<{ data: Website }>()
);

export const saveWebsiteFail = createAction(
  ItemsActionTypes.SaveWebsiteFail,
  props<{ error: Error | any }>()
);

export const deleteWebsite = createAction(
  ItemsActionTypes.DeleteWebsite,
  props<{ id: string }>()
);

export const deleteWebsiteSuccess = createAction(
  ItemsActionTypes.DeleteWebsiteSuccess,
  props<{ id: string }>()
);

export const deleteWebsiteFail = createAction(
  ItemsActionTypes.DeleteWebsiteFail,
  props<{ error: Error | any }>()
);

export const fromWebsiteActions = {
  loadWebsites,
  loadWebsitesFail,
  loadWebsitesSuccess,
  loadWebsite,
  loadWebsiteFail,
  loadWebsiteSuccess,
  saveWebsite,
  saveWebsiteSuccess,
  saveWebsiteFail,
  deleteWebsite,
  deleteWebsiteSuccess,
  deleteWebsiteFail,
};
