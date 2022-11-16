import { createAction, createReducer } from '@reduxjs/toolkit'
import {generateRandomNumber} from "../../utils/generateRandomNumber";

export interface Message {
    id?: number
    userName:string
    userId:number
    date: string
    chatId: number
    message: string
}

interface Chat {
    name: string
    id: number
    userName: string
    userId?: number
}

interface InitialState {
    name: string | null,
    id: number | null
    userName: string | null
    userId?: number | null
    messages: Array<Message>
}

export const enterChat = createAction<Chat>('chat/enter')
export const exitChat = createAction('chat/exit')
export const addMessage = createAction<Message>('chat/message/add')

const initialState = { id: null, name: null, userName: null, messages: [], userId: null } as InitialState

const chatReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(enterChat, (state, action) => {
            state.name = action.payload.name
            state.userName = action.payload.userName
            state.id = action.payload.id
            state.userId = generateRandomNumber()
        })
        .addCase(exitChat, (state, action) => {
            state.name = null
            state.userName = null
        })
        .addCase(addMessage, (state, action) => {
            state.messages.push({...action.payload, id: generateRandomNumber()})
        })
})

export default chatReducer


