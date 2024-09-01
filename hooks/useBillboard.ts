import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useBillboard = () => {
    const {data, error, isLoading, mutate } = useSWR("/api/random-movies", fetcher, {
        revalidateIfStale : false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }) 
    
    return {
        data, error, isLoading, mutate
    }
}

export default useBillboard