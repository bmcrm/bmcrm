import { ICamper } from 'entities/Camper/model/type';

interface NormalizedCamper {
  [key: string]: string;
}
export const normalizeResponse = (response: Array<Record<string, string>>): Array<Partial<ICamper>> => {
  return response.map(item => {
    const normalizedItem: NormalizedCamper = {};
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        normalizedItem[key as keyof Partial<ICamper>] = extractValue(item[key]);
      }
    }
    return normalizedItem;
  });
};
export const extractValue = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'object' && value !== null) {
    const keys = Object.keys(value);
    if (keys.length > 0) {
      const firstKey = keys[0];
      const nestedValue = value[firstKey];
      if (typeof nestedValue === 'object') {
        return extractValue(nestedValue as Record<string, unknown>);
      } else if (typeof nestedValue === 'string') {
        return nestedValue;
      }
    }
  } else if (typeof value === 'string') {
    return value;
  }
  return '';
};
