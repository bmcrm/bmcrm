import axios from 'axios';
import { EnvConfigs } from 'shared/config/env/env';
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
export enum LogSource {
  WEBAPP = 'WEBAPP',
  CAMPS = 'CAMPS',
  CAMPERS = 'CAMPERS',
  INVENTORY = 'INVENTORY',
}
const mode = EnvConfigs.BMCRM_ENV;
export const logger = (level: LogLevel, source: LogSource, message: string, context: Record<string, unknown>) => {
  axios.post(`https://api.${mode}.bmcrm.camp/eventlog`, {
    level,
    source,
    message,
    context: {
      ...context,
    },
  });
};
