import useBillboard from "@/hooks/useBillboard"
import { AiOutlineInfo, AiOutlineInfoCircle, AiOutlineLoading3Quarters } from "react-icons/ai"
import PlayButton from "./PlayButton"
import { useCallback } from "react"
import useInfoModal from "@/hooks/useInfoModal"

const Billboard = () => {

    const billboardData = useBillboard()
    const { openModal } = useInfoModal()

    const handleOpenModal = useCallback(() => {
        openModal(billboardData?.data?.id)
        // console.log("billboardData?.data?.id :", billboardData?.data?.id)
    }, [openModal, billboardData?.data?.id])

    // console.log(billboardData)

    if (billboardData.isLoading) {
        return (
            <>
                <div className="relative h-[40vh] lg:h-[56.25vw] flex items-center justify-cemter">
                    <AiOutlineLoading3Quarters className="text-white text-5xl mx-auto animate-spin" />
                </div>
            </>
        )
    } 

    return (
        <>
            <div className="relative h-[40vh] md:h-[56.25vw]">
                <video 
                    className="
                        w-full 
                        h-full  lg:h-[56.25vw] 
                        object-cover 
                        brightness-[60%]
                    "
                    muted
                    autoPlay
                    loop
                    src={billboardData.data?.videoUrl}>
                    poster={billboardData.data?.thumbnailUrl}
                </video>
                <div className="absolute top-[37%] md:top-[40%] ml-4 md:ml-16">
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
                        text-xs
                        text-opacity-80
                        md:text-lg
                        mt-3 md:mt-8
                        w-[90%] md:w-[80%] lg:w-[50%]
                        drop-shadow-xl
                        "
                    >
                        {billboardData.data?.description}
                    </p>
                    <div className="flex gap-3  items-center mt-3 md:mt-4 ">
                        <PlayButton movieId={billboardData.data?.id} />
                        <button  onClick={handleOpenModal}
                            className="
                                text-white
                                bg-white
                                bg-opacity-30 hover:bg-opacity-20
                                rounded-md
                                px-1 md:px-4
                                py-1 md:py-2
                                w-auto
                                font-normal lg:font-semibold
                                drop-shadow-xl
                                flex
                                items-center
                                transition
                                "
                        >
                            <AiOutlineInfoCircle className="mr-1 "  />
                            <span className=" text-sm font-normal ">More Info</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    
    )
}

export default Billboard