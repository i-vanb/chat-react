import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const chatApi = createApi({
    reducerPath: 'chat/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/chats',
    }),
    endpoints: (build) => ({
        getChats: build.query({
            query: () => ({
                url: `list`,
            }),
        }),
        getChat: build.query({
            query: id => ({
                url: id,
            }),
        })
    })
})

export const {
    useGetChatsQuery, useGetChatQuery
} = chatApi
