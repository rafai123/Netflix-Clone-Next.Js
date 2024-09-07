'use client'
import useMovie from "@/hooks/useMovie";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WatchMovie = () => {
    const router = useRouter();

    const params = useParams()

    const movieId = params?.movieId

    // console.log("movieId : ", movieId)

    const { data } = useMovie(movieId as string)

    // console.log(data)

    return (
        <>
            <div 
                className="
                    w-screen
                    h-screen
                    bg-black
                "
            >
            <nav
                className="
                    fixed
                    w-full
                    p-4
                    z-10
                    flex
                    items-center
                    gap-8
                    bg-black
                    bg-opacity-70
                "
            >
                <AiOutlineArrowLeft onClick={() => router.push("/ ")} size={40} className="text-white cursor-pointer" />
                <div>
                    <p className="text-white text-1xl md:text-3xl font-bold">
                        <span className="font-light">Watching : </span>
                        <span>{data?.title}</span>
                    </p>
                </div>
            </nav>

            <video 
                src={data?.videoUrl}
                autoPlay={true}
                controls={true}
                className="
                    w-full
                    h-full
                    "
            >
            </video>
            </div>
        </>
    )
}

export default WatchMovie