import { NodeSDK } from '@opentelemetry/sdk-node';

import resource from './resource';
import spanProcessor from './spanProcessor';
import instrumentations from './instrumentations';
import env from '@config/env';

const sdk = new NodeSDK({
  resource: resource,
  spanProcessor,
  instrumentations
});

env.ENABLE_TELEMETRY && sdk.start();
