"use client"
import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"
import axios from "axios"
import { FC, useCallback, useMemo } from "react"
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai"

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton:FC<FavoriteButtonProps> = ({movieId}) => {

    const {mutate: mutateFavorites} = useFavorites()
    const {data: currentUser, mutate} = useCurrentUser()

    const isFavorite = useMemo( () => {
        const list = currentUser?.favoriteIds || []

        return list.includes(movieId)
    }, [currentUser, movieId])

    console.log("isFavorite from FavoriteButton.tsx :", isFavorite)

    const toggleFavorites = useCallback(async () => {
        let response

        if (isFavorite) {
            response = await axios.delete("/api/movies", { data: { movieId } })
        } else {
            response = await axios.post('/api/movies', { movieId })
        }

        const updatedFavoriteIds = response?.data?.favoriteIds

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        })

        mutateFavorites()
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    // const handleGET = async () => {
    //     const response = await axios.get("/api/testpost")
    //     console.log("GET response :", response)
    // }

    // const handlePost = async () => {
    //     const response = await axios.post("/api/testpost", { movieId })
    //     console.log("POST response :", response)
    // }

    // const handleDelete = async () => {
    //     const response = await axios.delete("/api/testpost", { data: { movieId } })
    //     console.log("DELETE response :", response)
    // }

    return (
        <>
            <div 
            onClick={toggleFavorites}
                className="flex justify-center items-center rounded-full px-1 py-1 border-2 border-white group/item w-6 h-6 lg:w-10 lg:h-10 transiton hover:border-neutral-300">
                <Icon className="text-white" size={25} />
            </div>
            {/* <button onClick={handleGET}>GET</button>
            <button onClick={handlePost}>POST</button>
            <button onClick={handleDelete}>DEELETE</button> */}
        </>
    )
}

export default FavoriteButton