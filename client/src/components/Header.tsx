import {useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import React from "react";

const HeaderContainer = () => {
    const {name, userName} = useSelector((state:RootState) => state.chat)

    return <Header title={name} />
}

export default HeaderContainer

type HeaderProps = {
    title: string | null
}

const Header = ({title}:HeaderProps) => {

    return(
        <header className="header px-5 py-3">
            {title || 'React Chat'}
        </header>
    )
}
