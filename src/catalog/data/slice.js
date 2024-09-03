import { createSlice } from '@reduxjs/toolkit';

import STORE_NAMES from '../../common/constants';

const initialCatalogState = () => ({
  courses: [],
  errors: [],
  fetching: false,
});

const catalogReducers = {
  fetchCatalogRequest(state) {
    return { ...state, fetching: true };
  },
  fetchCatalogSuccess(state, action) {
    return { ...state, fetching: false, courses: action.payload };
  },
  fetchCatalogError(state, action) {
    return { ...state, fetching: false, errors: action.payload };
  },
};

const slice = createSlice({
  name: STORE_NAMES.CATALOG,
  reducers: catalogReducers,
  initialState: initialCatalogState(),
});

export const catalogReducer = slice.reducer;
export const { actions } = slice;
