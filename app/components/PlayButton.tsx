import { useRouter } from "next/navigation"
import { FC } from "react"
import { BsFillPlayFill } from "react-icons/bs"

interface PlayButtonProps {
    movieId: string
}

const PlayButton:FC<PlayButtonProps> = ({movieId}) => {

    const router = useRouter()

    return (
        <>
            <button 
                className="
                    rounded-md
                    flex
                    justify-center
                    bg-white
                    px-2 lg:px-4
                    py-1 lg:py-2
                    hover:bg-opacity-80
                    w-auto
                    font-semibold
                    text-xs lg:text-lg
                    items-center
                    transition
                    hover:bg-neutral-300
                " 
                onClick={()=> router.push(`/watch/${movieId}`)} >
                <BsFillPlayFill size={25} />
                Play
            </button>
        </>
    )
}

export default PlayButton