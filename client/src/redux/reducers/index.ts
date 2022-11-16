import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {chatApi} from "./api";
import warning from "./warning";
import chat from "./chat";

const rootReducer = combineReducers({
    warning, chat,
    [chatApi.reducerPath]: chatApi.reducer,
});

export const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

