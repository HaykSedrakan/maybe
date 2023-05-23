import { createSlice } from '@reduxjs/toolkit'

const navBarSlice = createSlice({
    name: 'navBar',
    initialState: {
        user: 'false'
    },
    reducers: {
        login: state => {state.user = true},
    }
})

export const { navBar } = navBarSlice.actions
export default navBarSlice.reducer;
