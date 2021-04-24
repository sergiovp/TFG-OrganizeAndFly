import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import sessionReducer from './sessionDucks';
import { save, load } from "redux-localstorage-simple";

const rootReducer = combineReducers({
    session: sessionReducer
});

export default function generateStore() {
    const store = createStore(rootReducer, load(),composeWithDevTools(applyMiddleware(thunk, save())));
    return store;
}
