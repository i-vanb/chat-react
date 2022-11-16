import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Chats from "../components/chat/ChatsContainer";
import {Error} from "../components/error/Error";
import Chat from "../components/chat/Chat";

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Chats />,
            },
            {
                path: "chats/:chatId",
                element: <Chat />,
            },
        ]
    },
]);
