import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useMovies = () => {
    const {data, isLoading, mutate, error } = useSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    })

    return {
        data,
        isLoading,
        mutate,
        error,
    }
}

export default useMovies