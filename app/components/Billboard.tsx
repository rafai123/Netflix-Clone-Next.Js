import useBillboard from "@/hooks/useBillboard"
import { AiOutlineInfo, AiOutlineInfoCircle } from "react-icons/ai"

const Billboard = () => {

    const billboardData = useBillboard()

    console.log(billboardData)

    return (
        <>
            <div className="relative h-[56.25vw]">
                <video 
                    className="
                        w-full 
                        h-[56.25vw] 
                        object-cover 
                        brightness-[60%]
                    "
                    muted
                    autoPlay
                    loop
                    src={billboardData.data?.videoUrl}>
                    poster={billboardData.data?.thumbnailUrl}
                </video>
                <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                    <p className="
                            text-white 
                            text-1xl 
                            md:text-5xl 
                            font-bold 
                            w-[65%] 
                            h-full 
                            drop-shadow-xl 
                            lg:text-6xl 
                        ">
                        {billboardData.data?.title}
                    </p>
                    <p className="
                        text-white 
                        text-[8px]
                        md:text-lg
                        mt-3 md:mt-8
                        w-[90%] md:w-[80%] lg:w-[50%]
                        drop-shadow-xl
                        "
                    >
                        {billboardData.data?.description}
                    </p>
                    <div className="flex gap-3 items-center mt-3 md:mt-4 ">
                        <button 
                            className="
                                text-white
                                bg-white
                                bg-opacity-30 hover:bg-opacity-20
                                rounded-md
                                px-1 md:px-4
                                py-1 md:py-2
                                w-auto
                                font-semibold
                                drop-shadow-xl
                                flex
                                items-center
                                transition
                                "
                        >
                            <AiOutlineInfoCircle className="mr-1" />
                            More Info
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Billboard