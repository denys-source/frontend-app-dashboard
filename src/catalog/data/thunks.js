/* eslint-disable import/prefer-default-export */

import * as api from './api';
import { actions } from './slice';

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch(actions.fetchCatalogRequest());
    const courses = await api.getCourses();
    dispatch(actions.fetchCatalogSuccess(courses));
  } catch (error) {
    dispatch(actions.fetchCatalogError(error));
  }
};
