import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type Farm = {
  id:string,
  name:string
}
export interface CounterState {
  selectFarm: Farm
  listFarms:any[]
  isSelect: boolean
}

const initialState: CounterState = {
  selectFarm: {id:'',name:''},
  listFarms:[],
  isSelect : false
}

export const farmrSlice = createSlice({
  name: 'farm',
  initialState,
  reducers: {
    chooseFarm: (state, action: PayloadAction<Farm>) => {
      state.isSelect = true
      let user = {
        id:action.payload.id,
        name:action.payload.name
      }
      state.selectFarm = user
    },
    fletchFarm: (state, action: PayloadAction<any[]>) => {
      state.isSelect = true
      state.listFarms = action.payload;
    },
  },
})

export const { chooseFarm ,fletchFarm} = farmrSlice.actions

export default farmrSlice.reducer