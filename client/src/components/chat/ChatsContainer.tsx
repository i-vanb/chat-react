import { useGetChatsQuery } from "../../redux/reducers/api"
import {Loader} from "../ui/Loader";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState, ChangeEvent} from "react";
import {Modal} from "../Modal";
import {useDispatch} from "react-redux";
import {show} from "../../redux/reducers/warning";
import {enterChat} from "../../redux/reducers/chat";


const ChatsContainer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {data: chatList, isLoading} = useGetChatsQuery(null)
    const [chat, setChat] = useState<number | null>(null)

    const goToChat = (id:number) =>  navigate(`chats/${id}`);

    useEffect(()=>{
        chat && dispatch(show({
            message:'Чтобы зайти в чат введите имя',
            type: "children"
        }))
    }, [chat, dispatch])

    if(isLoading) return <Loader />

    return(
        <main className="main flex-1 px-5 py-3 overflow-y-auto">
            {chatList?.map((i:any) => <ChatCard key={i.id} name={i.name} id={i.id} goToChat={setChat}/>)}
            <Modal onResolve={goToChat}>
                <div>
                    <ChatRegisterForm {...chatList.filter((i:any)=>i.id===chat)[0]}
                                      onSubmit={goToChat}
                    />
                </div>
            </Modal>
        </main>
        )
}


export default  ChatsContainer



const ChatCard = (props: ChatCardProps) => {
    const {name, id, goToChat} = props

    const enterHandler = () => goToChat(id)


    return(
        <div className="flex flex-row item-center justify-between my-2">
            <div className="font-bold">
                {name}
            </div>
            <div>
                <button onClick={enterHandler}>Начать чат</button>
            </div>
        </div>
    )
}

type ChatCardProps = {
    id: number
    name: string
    goToChat: (id:number) => void
}

type ChatItem = {
    id: number
    name: string
    onSubmit: (id:number)=>void
}

const ChatRegisterForm = (props:ChatItem) => {
    const {id, name, onSubmit} = props
    const [userName, setUserName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const submitHandler = () => {
        if(!userName) return setError('Поле не может быть путым')
        dispatch(enterChat({name, userName, id}))
        onSubmit(id)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>
        error
        ? setError(null)
        : setUserName(e.target.value)

    return(
        <>
            <div className="p-4">
                <h3 className='font-bold'>Введите имя, чтобы начать чат</h3>
                <p>{name}</p>
            </div>
            <div className="flex flex-row justify-between p-4">
                <div className="input__container">
                    <input value={userName}
                       onChange={onChangeHandler}
                       className="mr-4 p-2"
                       placeholder="Введите имя"
                    />
                    {error && <span className="input__error">{error}</span>}
                </div>
                <button onClick={submitHandler} className="main-btn">Войти</button>
            </div>
        </>
    )
}
