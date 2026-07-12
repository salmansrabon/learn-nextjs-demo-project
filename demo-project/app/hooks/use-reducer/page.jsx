'use client';
import { useReducer } from 'react';
import PageHeader from '@/components/PageHeader';

const initialState = { count: 0 };

// A reducer is a pure function: (currentState, action) => newState
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':      return initialState;
    default: return state;
  }
}

export default function UseReducerPage() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <>
      <PageHeader
        title="useReducer — Complex State via Actions"
        description="Instead of calling multiple setState functions, you dispatch an action and a reducer decides the new state."
      />
      <div className="demo">
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </>
  );
}
