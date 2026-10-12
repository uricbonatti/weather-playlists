import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';

import env from '@config/env';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: env.PROJECT_NAME,
  [ATTR_SERVICE_VERSION]: env.PROJECT_VERSION,
  'deployment.environment.name': env.NODE_ENV || 'development'
});

export default resource;
