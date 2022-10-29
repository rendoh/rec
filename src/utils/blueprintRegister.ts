import { InternalFieldName, UseFormRegisterReturn } from 'react-hook-form';

export function blueprintRegister<TFieldName extends InternalFieldName>({
  ref,
  ...rest
}: UseFormRegisterReturn<TFieldName>) {
  return {
    inputRef: ref,
    ...rest,
  };
}
