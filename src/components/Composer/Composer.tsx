import { JSXElementConstructor, ReactNode, FC } from 'react';

type ComponentWithChildren = { children: ReactNode };
type ComposerProps = ComponentWithChildren & {
  providers: JSXElementConstructor<ComponentWithChildren>[];
};

export const Composer: FC<ComposerProps> = ({ providers, children }) => (
  <>
    {providers.reduceRight(
      (accumulator, Provider) => (
        <Provider>{accumulator}</Provider>
      ),
      children,
    )}
  </>
);
