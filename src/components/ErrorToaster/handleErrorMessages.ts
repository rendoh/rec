import 'react-toastify/dist/ReactToastify.css';
import { apiErrorSchema } from '../../schemas/error';
import { toast, cssTransition } from 'react-toastify';
import { toasterStyle, enter, exit } from './ErrorToaster.css';

const transition = cssTransition({
  enter,
  exit,
});

export function handleErrorMessages(error: unknown) {
  const result = apiErrorSchema.safeParse(error);
  if (result.success) {
    result.data.messages.forEach((message) => {
      toast.error(message, {
        icon: false,
        className: toasterStyle,
        autoClose: 3000,
        transition,
      });
    });
  } else {
    throw error;
  }
}
