import { Html } from "@react-three/drei"
import {LoaderCircleIcon as LoaderSpinnerIcon} from "lucide-react"

const Loader = () => {
  return (
    <Html>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue z-20">
            <div className="w-[10vw] h-[10vh] self-center rounded-full">
                <LoaderSpinnerIcon className="loader_spin"/>
            </div>
        </div>
    </Html>
  )
}

export default Loader