import {TailSpin} from "react-loader-spinner";

export const Loader = () => {
    return(
        <div className="flex items-center justify-center">
            <TailSpin
                height="30"
                width="30"
                color="#050038"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
