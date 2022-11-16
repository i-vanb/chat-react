import { createAction, createReducer } from '@reduxjs/toolkit'

interface WarningState {
    message: string | null,
    type: 'error' | 'warning' | 'confirm' | 'children' | null,
    result?: ResultType
}

type ResultType = 'apply' | 'cancel'

export const show = createAction<WarningState>('warning/show')
export const resolve = createAction<ResultType>('warning/resolve')
export const hide = createAction('warning/hide')

const initialState = { message: null, type: null } as WarningState

const warningReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(show, (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
        })
        .addCase(resolve, (state, action) => {
            state.result = action.payload
        })
        .addCase(hide, (state, action) => {
            state.message = null
            state.type = null
            state.result = undefined
        })
})


export default warningReducer
