import { FC } from "react"
import { BsFillPlayFill } from "react-icons/bs"
import FavoriteButton from "./FavoriteButton"
import { useRouter } from "next/navigation"

interface MovieCardProps {
    data: Record<string, any>
}

const MovieCard:FC<MovieCardProps> = ({ data }) => {
    console.log("movies : ", data)
    const router = useRouter()
    return (
        <>
            <div className="group relative bg-zinc-900 col-span h-[12vw]">
                <img 
                    className="
                        cursor-pointer
                        object-cover
                        transition
                        duration-200
                        shadow-xl
                        rounded-md
                        group-hover:opacity-90
                        sm:group-hover:opacity-0
                        delay-300
                        w-full
                        h-[12vw]
                    "
                    src={data.thumbnailUrl} 
                    alt={data.title} 
                />
                <div
                    className="
                        absolute
                        opacity-0
                        top-0
                        transition
                        duration-200
                        z-10
                        invisible
                        sm:visible
                        delay-300
                        w-full
                        scale-0
                        group-hover:scale-110
                        group-hover:-translate-y-[6vw]
                        group-hover:translate-x-[2vw]
                        group-hover:opacity-100
                    "
                >
                    <img 
                        className="
                            cursor-pointer
                            object-cover
                            transition
                            duration-200
                            shadow-xl
                            rounded-t-md
                            w-full
                            h-[12vw]
                        "
                        src={data.thumbnailUrl} 
                        alt={data.title} 
                    />
                    <div
                        className="
                            z-10
                            bg-zinc-800
                            p-2
                            lg:p-4
                            absolute
                            w-full
                            transition
                            shadow-md
                            rounded-b-md
                        "
                    >   
                    <div className="flex">
                        <div className="
                                cursor-pointer
                                w-6
                                h-6
                                lg:w-10
                                lg:h-10
                                bg-white
                                rounded-full
                                flex
                                flex-row
                                justify-center
                                items-center
                                transition
                                hover:bg-neutral-200
                                mr-2
                            "
                        >
                            <BsFillPlayFill onClick={() => router.push(`/watch/${data?.id}`)} size={30} className="mx-auto"/>
                        </div>

                        <div>
                            <FavoriteButton movieId={data?.id} />
                        </div>
                    </div>
                        
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2024</span>
                    </p>

                    <div className="flex mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm ">{data?.duration}</p>
                    </div>
                    <div className="flex mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm ">{data?.genre}</p>
                    </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MovieCard