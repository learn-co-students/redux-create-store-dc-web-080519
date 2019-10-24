// generic createStore() that takes a reducer function object as argument
function createStore(reducerObj) {
  // all our state building and retrieving is protected in this closure
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  };

  function getState() {
    return state;
  }

  // dispatch() and getState() can be invoked to indirectly access material in our function body
  return {
    dispatch,
    getState
  };
}


function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};



function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

// when we create the store for this SPECIFIC app, we give it our SPECIFIC reducer
let store = createStore(reducer);
store.dispatch({ type: '@@INIT' })

const button = document.getElementById('button');

button.addEventListener('click', function() {
  store.dispatch({ type: 'INCREASE_COUNT' });
})
