import {Link} from "react-router-dom";

export const Error = () => {
    return (
        <div className="error__wrapper" id="error-page">
            <h1>Ой!</h1>
            <p>Пардон, кажется, возникла ошибка.</p>
            <div className="error__back">
                <Link to={"/"}>Вернуться на главную</Link>
            </div>
        </div>
    );
}
