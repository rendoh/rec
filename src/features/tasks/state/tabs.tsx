import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type TabType = 'list' | 'aggregation';

const stateContext = createContext<TabType>('list');
const stateSetterContext = createContext<(tabType: TabType) => void>(
  () => undefined,
);

export const TabsStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tabState, selectTab] = useState<TabType>('list');

  return (
    <stateContext.Provider value={tabState}>
      <stateSetterContext.Provider value={selectTab}>
        {children}
      </stateSetterContext.Provider>
    </stateContext.Provider>
  );
};

export function useTabState(): TabType {
  return useContext(stateContext);
}

export function useSelectTab() {
  return useContext(stateSetterContext);
}
