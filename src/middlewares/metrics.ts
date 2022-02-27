import promMid from 'express-prometheus-middleware';

interface IPrometheusMetrics {
  metricsPath: string;
  collectDefaultMetrics: boolean;
  requestDurationBuckets: number[];
  requestLengthBuckets: number[];
  responseLengthBuckets: number[];
}
const metricsConfig: IPrometheusMetrics = {
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
};
const metrics = promMid(metricsConfig);

export default metrics;
