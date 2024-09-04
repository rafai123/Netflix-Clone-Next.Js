import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useFavorites = () => {
    const {data, mutate, isLoading, error } = useSWR('/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        // revalidateOnMount: false
    })
    
    return {
        data, 
        mutate,
        isLoading,
        error
    }
}

export default useFavorites