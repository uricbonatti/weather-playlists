import {
  JaegerExporter,
  ExporterConfig as JaegerConfig
} from '@opentelemetry/exporter-jaeger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK, tracing } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import { name, version } from '../../package.json';

const resourceConfig = {
  [SemanticResourceAttributes.SERVICE_NAME]: name,
  [SemanticResourceAttributes.SERVICE_VERSION]: version
};

const defaultUrl = 'http://localhost:14268/api/traces';
const jaegerCollectorUrl = process.env.JAEGER_COLLECTOR_URL || defaultUrl;
const jaegerConfig: JaegerConfig = {
  tags: [
    { key: 'node.version', value: process.version },
    { key: 'env', value: process.env.NODE_ENV || 'development' }
  ],
  endpoint: jaegerCollectorUrl
};

const jaegerExporter = new JaegerExporter(jaegerConfig);
const spanProcessor =
  process.env.NODE_ENV !== 'production'
    ? new tracing.SimpleSpanProcessor(jaegerExporter)
    : new tracing.BatchSpanProcessor(jaegerExporter);

const sdk = new NodeSDK({
  resource: new Resource(resourceConfig),
  spanProcessor,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();
