import { Position, Toaster } from '@blueprintjs/core';

export const ErrorToaster = Toaster.create({
  position: Position.TOP,
  maxToasts: 3,
});
