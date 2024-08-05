import { createStore, combineReducers,applyMiddleware ,compose} from 'redux';
import templateReducer from './templateReducer';
import userInfoReducer from './userInfoReducer';
import{thunk} from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  template: templateReducer,
  userInfo: userInfoReducer,
});

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const preloadedState = loadState();

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    // Handle errors
    console.error('Could not save state', err);
  }
};

// Create the Redux store
const store = createStore(
  rootReducer,
  preloadedState,composeEnhancers(applyMiddleware(thunk))
  // Apply middleware if needed
);

// Save the state to localStorage whenever it changes
store.subscribe(() => {
  saveState(store.getState());
});

export default store;

