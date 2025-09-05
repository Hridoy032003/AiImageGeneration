import {configureStore} from '@reduxjs/toolkit'
import tokenReducer from '../app/actions/tokenSlice'
export const store = configureStore({
    reducer: tokenReducer
})