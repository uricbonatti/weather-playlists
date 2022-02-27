import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import env from '@config/env';

const resourceConfig = {
  [SemanticResourceAttributes.SERVICE_NAME]: env.PROJECT_NAME,
  [SemanticResourceAttributes.SERVICE_VERSION]: env.PROJECT_VERSION
};

const resources = new Resource(resourceConfig);

export default resources;
