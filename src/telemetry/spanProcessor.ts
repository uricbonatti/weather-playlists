import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
  BatchSpanProcessor,
  SimpleSpanProcessor
} from '@opentelemetry/sdk-trace-base';

import env from '@config/env';

// Envia via OTLP/HTTP (o Jaeger aceita OTLP nativamente na porta 4318).
const exporter = new OTLPTraceExporter({
  url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`
});

const spanProcessor =
  env.NODE_ENV !== 'production'
    ? new SimpleSpanProcessor(exporter)
    : new BatchSpanProcessor(exporter);

export default spanProcessor;
