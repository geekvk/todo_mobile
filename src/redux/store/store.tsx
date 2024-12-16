import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducer/todoReducer'
import categoryReducer from '../reducer/categoryReducer'
import authReducer from '../reducer/authReducer';

const store = configureStore({
    reducer : {
        todos : todoReducer,
        categories : categoryReducer,
        auth : authReducer
    }
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;