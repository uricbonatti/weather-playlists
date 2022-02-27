import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const instrumentations = [getNodeAutoInstrumentations()];

export default instrumentations;
