import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { handleErrorMessages } from '../../../components/ErrorToaster';
import { findRecentTaskTitles, findTasks } from '../api';
import { Task } from '../schemas';
import { useCurrentDateRange } from './currentDate';

type State = {
  tasks: Task[];
  isLoading: boolean;
  recentTasks: string[];
};

const initialState: State = {
  tasks: [],
  isLoading: false,
  recentTasks: [],
};

type Action =
  | {
      type: 'FETCH_REQUESTED';
    }
  | {
      type: 'FETCH_SUCCEEDED';
      payload: {
        tasks: Task[];
        recentTasks: string[];
      };
    }
  | {
      type: 'FETCH_FAILED';
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FETCH_SUCCEEDED': {
      const { tasks, recentTasks } = action.payload;
      return {
        ...state,
        isLoading: false,
        tasks,
        recentTasks,
      };
    }

    case 'FETCH_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

const stateContext = createContext<State>(initialState);
const dispatchContext = createContext<Dispatch<Action>>(() => undefined);

export const TasksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export function useTasks() {
  return useContext(stateContext);
}

export function useFetchTasks() {
  const dispatch = useContext(dispatchContext);
  const { from, to } = useCurrentDateRange();
  const refetchTasks = useCallback(async () => {
    dispatch({ type: 'FETCH_REQUESTED' });
    try {
      const [tasks, recentTasks] = await Promise.all([
        findTasks({ from, to }),
        findRecentTaskTitles(),
      ]);
      dispatch({
        type: 'FETCH_SUCCEEDED',
        payload: {
          tasks,
          recentTasks,
        },
      });
    } catch (error: unknown) {
      dispatch({ type: 'FETCH_FAILED' });
      handleErrorMessages(error);
    }
  }, [dispatch, from, to]);

  return refetchTasks;
}
