/* eslint-disable import/prefer-default-export */

import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

ensureConfig(['LMS_BASE_URL'], 'course API');

export const getCourses = async () => {
  const client = getAuthenticatedHttpClient();
  const { LMS_BASE_URL } = getConfig();
  const response = await client.get(`${LMS_BASE_URL}/api/courses/v1/courses/`);
  return response.data.results;
};
