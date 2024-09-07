import fetcher from "@/lib/fetcher"
import useSWR from "swr"

// interface useMovieProps {
//     id: string;
// }

const useMovie = (id:string) => {

    // console.log("from useMovie", id)
    const {data, isLoading, error, mutate} = useSWR(`/api/movies/${id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false
    })

    return {
        data,
        isLoading,
        error,
        mutate
    }
}

export default useMovie