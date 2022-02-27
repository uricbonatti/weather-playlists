import {
  JaegerExporter,
  ExporterConfig as JaegerConfig
} from '@opentelemetry/exporter-jaeger';
import { tracing } from '@opentelemetry/sdk-node';

import env from '@config/env';

const jaegerCollectorUrl = env.JAEGER_COLLECTOR_URL;
const jaegerConfig: JaegerConfig = {
  tags: [
    { key: 'node.version', value: process.version },
    { key: 'env', value: env.NODE_ENV || 'development' }
  ],
  endpoint: jaegerCollectorUrl
};

const jaegerExporter = new JaegerExporter(jaegerConfig);
const spanProcessor =
  process.env.NODE_ENV !== 'production'
    ? new tracing.SimpleSpanProcessor(jaegerExporter)
    : new tracing.BatchSpanProcessor(jaegerExporter);

export default spanProcessor;
