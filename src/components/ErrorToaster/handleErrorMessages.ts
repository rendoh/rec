import { apiErrorSchema } from '../../schemas/error';
import { ErrorToaster } from './ErrorToaster';

export function handleErrorMessages(error: unknown) {
  const result = apiErrorSchema.safeParse(error);
  if (result.success) {
    result.data.messages.forEach((message) => {
      ErrorToaster.show({
        message,
        intent: 'danger',
        timeout: 5000,
      });
    });
  } else {
    throw error;
  }
}
