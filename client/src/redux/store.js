import {configureStore} from "@reduxjs/toolkit";
import navBarSlice from './navbar'

export default configureStore({
    reducer: {
        user: navBarSlice
    }
})