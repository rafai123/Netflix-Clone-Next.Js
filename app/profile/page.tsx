"use client"

import useCurrentUser from "@/hooks/useCurrentUser"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const ProfilePage = () => {

    const {data: session, status, update} = useSession()
    const router = useRouter()

    if (status === "unauthenticated") {
        router.push("/auth")
    }

    const {data: user} = useCurrentUser()

    // console.log("user: ", user)


    return (
        (session && status === "authenticated") &&
        <>
            <div className="w-screen h-screen flex bg-black justify-center items-center flex-col" >
                <h2 className="text-4xl md:text-6xl text-white text-center">Who is watching?</h2>
                <div className="flex justify-center items-center gap-8 mt-10">
                    <div onClick={() => router.push("/")}>
                        <div className="group flex-row w-44 mx-auto">
                            <div 
                                className="
                                    w-44
                                    h-44
                                    rounded-md
                                    flex
                                    items-center
                                    justify-center
                                    border-2
                                    border-transparent
                                    group-hover:border-white
                                    group-hover:scale-105
                                    group-hover:transition
                                    group=hover:cursor-pointer
                                    overflow-hidden
                                "
                            >
                                <img src="\images\netflix_default_blue.png" alt={user?.name} />
                            </div>
                                <p className="mt-4 text-gray-400 group-hover:text-white text-2xl transition text-center">{user?.name}</p>
                        </div>
                    </div>
                </div>
            </div> 
        </>
        
    )
}


export default ProfilePage