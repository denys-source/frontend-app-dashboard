import {
  Alert,
  Card,
  Col,
  Container,
  Row,
  Button,
  CardGrid,
} from '@openedx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCourses } from './data/thunks';
import selectCourses from './data/selectors';
import messages from './messages';

const buildLmsUrl = (absoluteUrl) => `${getConfig().LMS_BASE_URL}${absoluteUrl}`;
const buildCourseURL = (courseKey) => buildLmsUrl(`/courses/${courseKey}/about`);

export const CatalogPageBase = ({ intl }) => {
  const dispatch = useDispatch();
  const { courses, errors, fetching } = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>{intl.formatMessage(messages.catalogHeading)}</h1>
        </Col>
        <Col xs={12}>
          {errors.map((error) => (
            <Alert variant="danger" key={error}>
              {error}
            </Alert>
          ))}
        </Col>
      </Row>
      {(fetching && (
        <Row>
          <Col className="text-center">
            {intl.formatMessage(messages.catalogLoading)}
          </Col>
        </Row>
      )) || (
        <CardGrid columnSizes={{ xs: 12, md: 6, lg: 3 }}>
          {courses.map((course) => (
            <Card isClickable>
              <Card.ImageCap
                src={buildLmsUrl(course.media.course_image.uri)}
                srcAlt={intl.formatMessage(messages.catalogCourseBannerAlt, {
                  courseName: course.name,
                })}
              />
              <Card.Header title={course.name} />
              <Card.Section>{course.short_description}</Card.Section>
              <Card.Footer>
                <Button variant="primary" href={buildCourseURL(course.id)}>
                  {intl.formatMessage(messages.catalogCourseView)}
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </CardGrid>
      )}
    </Container>
  );
};

CatalogPageBase.propTypes = {
  intl: intlShape.isRequired,
};

export const CatalogPage = injectIntl(CatalogPageBase);
