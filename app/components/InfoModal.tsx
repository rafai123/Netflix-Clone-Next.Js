"use client"
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { FC, useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

interface InfoModalProps{
    visible?: boolean;
    onClose: any;
}

const InfoModal: FC<InfoModalProps> = ({visible, onClose}) => {

    const [isVisible, setIsVisible] = useState(!!visible)

    const { movieId } = useInfoModal()

    // console.log("movieId from InfoModal.tsx :", movieId)

    const { data = {} } = useMovie(movieId as string)

    useEffect(() => {
        setIsVisible(!!visible)
    }, [onClose, visible])

    const handleClose = useCallback(() => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [onClose])

    if (!visible){
        return null
    }
    
    return (
        <>
            <div 
                className="
                    z-50
                    transition
                    duration-300
                    bg-black
                    bg-opacity-80
                    flex
                    justify-center
                    items-center
                    overflow-hidden
                    fixed
                    inset-0
                "
            >
                <div 
                    className="
                        relative
                        w-auto
                        mx-auto
                        max-w-3xl
                        overflow-hidden
                        text-white
                    "
                >
                    <div
                        className={`
                            ${isVisible ? 'scale-100' : 'scale-0'}
                            transform
                            duration-300
                            relative
                            flex-auto
                            bg-zinc-900
                            drop-shadow-md
                        `}
                    >
                        <div className="relative h-96">
                            <video 
                                className="
                                    w-full
                                    h-full
                                    brightness-[60%]
                                    object-cover
                                "
                                muted
                                autoPlay
                                loop
                                poster={data?.thumbnailUrl}
                                src={data?.videoUrl}>
                            </video>
                            <div
                                onClick={handleClose}
                                className="
                                    absolute
                                    top-3
                                    right-3
                                    bg-black
                                    bg-opacity-70
                                    rounded-full
                                    h-10
                                    w-10
                                    flex
                                    justify-center
                                    items-center
                                    hover:bg-opacity-90
                                    cursor-pointer
                                    hover:scale-105
                                "
                            >
                                <AiOutlineClose size={20} />
                            </div>
                            <div 
                                className="
                                    absolute
                                    bottom-[10%]
                                    left-10
                                "
                            >
                                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                    {data?.title}Titel
                                </p>
                                <div className="flex gap-4 items-center text-neutral-900">
                                    <PlayButton  movieId={data?.id} />
                                    <FavoriteButton movieId={data?.id} />
                                </div>
                            </div>
                        </div>

                        <div className="px-12 py-8">
                            <p className="text-green-400 font-semibold text-lg">
                                New
                            </p>
                            <p className="text-lg">
                                {data?.duration}
                            </p>
                            <p className="text-lg">
                                {data?.genre}
                            </p>
                            <p className="text-lg">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoModal