import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "crypto";

interface UserState {
    isLoggedIn: boolean;
    user: { id: UUID; username: string; nickname: string; } | null;
}
const accessToken = localStorage.getItem('accessToken');

const initialState: UserState = {
    isLoggedIn: accessToken === null || accessToken === undefined || accessToken === '' ? false : true,
    user: null
} 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: UUID; username: string; nickname: string; }>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.setItem('accessToken', '');
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


