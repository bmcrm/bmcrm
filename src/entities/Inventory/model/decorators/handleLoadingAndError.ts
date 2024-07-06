import { AxiosError } from 'axios';
type AsyncFunction = (...args: any[]) => Promise<void>;

function handleLoadingAndError(set: (state: any) => void) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value as AsyncFunction;

    descriptor.value = async function (...args: any[]) {
      try {
        set({ isLoading: true });
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        set({ isError: error as AxiosError });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    };

    return descriptor;
  };
}
