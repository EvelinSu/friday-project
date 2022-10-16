import {applyMiddleware, AnyAction, combineReducers, legacy_createStore} from "redux";
import {authReducer, TAuthActions} from "../authReducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"

const rootReducer = combineReducers({
    auth: authReducer
})


const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type TAppDispatch = ThunkDispatch<TRootState, undefined, AnyAction>;

export type TRootState = ReturnType<typeof store.getState>
export type TAppActions = TAuthActions

export default store