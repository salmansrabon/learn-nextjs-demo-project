'use client';
import { useReducer } from 'react';

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

export default function Demo() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="demo">
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
