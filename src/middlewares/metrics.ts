import promBundle from 'express-prom-bundle';

const metrics = promBundle({
  metricsPath: '/metrics',
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  buckets: [0.1, 0.5, 1, 1.5],
  promClient: { collectDefaultMetrics: {} }
});

export default metrics;
