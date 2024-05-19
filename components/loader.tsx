import { Spin } from "antd"

const Loader = () => {
    return (
        <div className="flex justify-center -mt-16 items-center h-screen">
            <Spin size="large" />
        </div>
    )
}

export default Loader