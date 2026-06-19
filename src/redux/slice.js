import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:"dataslice",
    initialState:{
        data:[],
        loading: false,
        error:null
    },
    reducers:{
        AddTodoo : (state,action)=>{
            const todoo = {...action.payload,done:false}
            state.data.push(todoo)
            localStorage.setItem('todos', JSON.stringify(state.data))
        },
        getTodoo : (state,action)=>{
            state.data = action.payload
        },
        DeleteTodoo : (state,action)=>{
            const id = action.payload
            state.data = state.data.filter(item => item.id !== id)
            localStorage.setItem('todos', JSON.stringify(state.data))
        },
        DoneTodoo : (state,action)=>{
            const id  = action.payload
            state.data = state.data.map(item=> item.id == id ? {...item,done:true} : item)
            localStorage.setItem('todos', JSON.stringify(state.data))
        },
        UpdateToddo : (state,action)=>{
            const id = Number(action.payload.id)
            state.data = state.data.map(item=> item.id == id ? {...item,...action.payload}: item)
            localStorage.setItem('todos', JSON.stringify(state.data))
        }
    }
})

export default dataSlice.reducer
export const {AddTodoo,getTodoo,DeleteTodoo,DoneTodoo,UpdateToddo} = dataSlice.actions