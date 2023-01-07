import {
  addDays,
  addMonths,
  endOfDay,
  isSameDay,
  isToday,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type State = {
  currentDate: Date;
  from: Date;
  to: Date;
  today: Date;
  isToday: boolean;
};

function getDateRange(date: Date) {
  return {
    from: startOfDay(date),
    to: endOfDay(date),
  };
}

const initialDate = new Date();
const initialState: State = {
  currentDate: initialDate,
  ...getDateRange(initialDate),
  today: initialDate,
  isToday: true,
};

type Action =
  | {
      type: 'CURRENT_DATE_SET';
      payload: Date;
    }
  | {
      type: 'TODAY_CHANGED';
      payload: Date;
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'CURRENT_DATE_SET': {
      return {
        ...state,
        currentDate: action.payload,
        ...getDateRange(action.payload),
        isToday: isSameDay(action.payload, state.today),
      };
    }

    case 'TODAY_CHANGED': {
      return {
        ...state,
        today: action.payload,
        isToday: isSameDay(action.payload, state.currentDate),
      };
    }

    default:
      return state;
  }
};

const stateContext = createContext<State>(initialState);
const dispatchContext = createContext<Dispatch<Action>>(() => undefined);

export const CurrentDateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isToday(state.today)) {
        dispatch({
          type: 'TODAY_CHANGED',
          payload: new Date(),
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [state.today]);

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export function useToday(): Date {
  return useContext(stateContext).today;
}

export function useCurrentDate(): Date {
  return useContext(stateContext).currentDate;
}

export function useIsCurrentDateToday(): boolean {
  return useContext(stateContext).isToday;
}

export function useCurrentDateRange() {
  const { from, to } = useContext(stateContext);
  return { from, to };
}

export function useToPrevMonth() {
  const currentDate = useCurrentDate();
  const dispatch = useContext(dispatchContext);
  return useCallback(
    () =>
      dispatch({
        type: 'CURRENT_DATE_SET',
        payload: subMonths(startOfMonth(currentDate), 1),
      }),
    [currentDate, dispatch],
  );
}

export function useToNextMonth() {
  const currentDate = useCurrentDate();
  const today = useToday();
  const dispatch = useContext(dispatchContext);
  return useCallback(() => {
    const nextMonth = addMonths(startOfMonth(currentDate), 1);
    const payload = nextMonth.getTime() > today.getTime() ? today : nextMonth;
    dispatch({
      type: 'CURRENT_DATE_SET',
      payload,
    });
  }, [currentDate, dispatch, today]);
}

export function useToPrevDay() {
  const currentDate = useCurrentDate();
  const dispatch = useContext(dispatchContext);
  return useCallback(
    () =>
      dispatch({
        type: 'CURRENT_DATE_SET',
        payload: subDays(currentDate, 1),
      }),
    [currentDate, dispatch],
  );
}

export function useToNextDay() {
  const currentDate = useCurrentDate();
  const dispatch = useContext(dispatchContext);
  return useCallback(
    () =>
      dispatch({
        type: 'CURRENT_DATE_SET',
        payload: addDays(currentDate, 1),
      }),
    [currentDate, dispatch],
  );
}

export function useToToday() {
  const dispatch = useContext(dispatchContext);
  return useCallback(
    () =>
      dispatch({
        type: 'CURRENT_DATE_SET',
        payload: new Date(),
      }),
    [dispatch],
  );
}
