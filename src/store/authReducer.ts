import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  access: string
}

const initialState: CounterState = {
  value: 0,
  access : localStorage.getItem("access")
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload
    },
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer