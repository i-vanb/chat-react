import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useGetChatQuery} from "../../redux/reducers/api";
import {Loader} from "../ui/Loader";
import React, {useEffect, useState, KeyboardEvent} from "react";
import {exitChat, addMessage, Message} from "../../redux/reducers/chat";
import { io, Socket } from "socket.io-client";
import {RootState} from "../../redux/reducers";

const socket = io('http://localhost:80')

type ChatProps = {
    chat: {
        id: number
        name: string
    }
}

const ChatContainer = () => {
    let {chatId} = useParams();
    const {data: chat, isLoading} = useGetChatQuery(chatId)

    if(isLoading) return <Loader />

    return <Chat chat={chat} />
}

const Chat = (props:ChatProps) => {
    const {chat} = props
    const [isConnected, setIsConnected] = useState(socket.connected);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {messages, name, userName, userId} = useSelector((state:RootState) => state.chat)

    const [msg, setMsg] = useState('')

    useEffect(()=>{
        if(!userName) navigate('/')
        socket.on('connect', () => setIsConnected(true))
        socket.on('disconnect', () => setIsConnected(false))
        socket.on('message', ({data}) => {
            dispatch(addMessage(data))
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    }, [])

    const submitMessageHandler = () => {
        socket.emit('message', {data: {message:msg, userName, userId, chatId:chat.id, date: new Date().toISOString()}})
        setMsg('')
    }

    const keyDownHandler = (e:KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            submitMessageHandler()
        }
    }

    return(
        <div className="flex-1 flex flex-col">
            <div className="message__wrapper flex-1">
                {messages.map(i => {

                    const isOwner = userId === i.userId
                    const className = `message__item${isOwner ? ' right':''}`

                    return(
                        <div className={className} key={i.id}>
                            <h3 className="message__item-title">{isOwner ? 'Вы' : i.userName}</h3>
                            <p>{i.message}</p>
                        </div>
                    )
                })}
            </div>
            <div className="message__control px-5 py-3 flex flex-row gap-x-2">
                <div className="flex-1">
                    <textarea value={msg}
                              onKeyDown={keyDownHandler}
                              onChange={e=>setMsg(e.target.value)}
                              className="w-full"
                              placeholder="Введите сообщение"
                    />
                </div>
                <div onClick={submitMessageHandler} className="message__control__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer
