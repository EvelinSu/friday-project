import {applyMiddleware, AnyAction, combineReducers, legacy_createStore} from "redux";
import {authReducer} from "../authReducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"

const rootReducer = combineReducers({
    auth: authReducer
})

export type TAppDispatch = ThunkDispatch<TRootState, undefined, AnyAction>;

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type TRootState = ReturnType<typeof store.getState>
