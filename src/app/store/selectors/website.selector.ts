import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, WEBSITE_FEATURE_KEY, State} from '../reducers/website.reducer';

// Lookup the 'Entity' feature state managed by NgRx
const getEntityState = createFeatureSelector<State>(WEBSITE_FEATURE_KEY);

// get the selectors
const {selectIds, selectAll, selectTotal} = adapter.getSelectors();

export const selectAllWebsites = createSelector(
  getEntityState,
  selectAll
);

export const getSelectedWebsite = createSelector(
  getEntityState,
  (state) => state.selectedItem
);

export const getItemById = (id: string) => createSelector(
  selectAllWebsites,
  (state) => {
    if (state) {
      return state.find(item => {
        return item.id === id;
      });
    } else {
      return {};
    }
  });

export const getWebsiteById = () => createSelector(
  getSelectedWebsite,
  (state) => state
);

// select the array of Entity ids
export const selectEntityIds = createSelector(
  getEntityState,
  selectIds
);

// select the total Entity count
export const selectEntityCount = createSelector(
  getEntityState,
  selectTotal
);

// select entity loaded flag
export const selectEntityLoaded = createSelector(
  getEntityState,
  state => state.loaded
);

// select entity error
export const selectError = createSelector(
  getEntityState,
  state => state.error
);
