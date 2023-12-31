import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateUserStart: (state, action) => {
            state.loading = true
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateUserSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        deleteUserStart: (state, action) => {
            state.loading = false
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null
            state.loading = false
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

    }
})

export const {
    signInFailure,
    signInStart,
    signInSuccess,
    updateUserStart,
    updateUserFailure,
    updateUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;