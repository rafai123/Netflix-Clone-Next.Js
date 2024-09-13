import useMovies from "@/hooks/useMovies"
import { isEmpty } from "lodash"
import { FC } from "react"
import MovieCard from "./MovieCard"

interface MovieListProps {
    data: Record<string, any>[]
    title: string
}

const MovieList:FC<MovieListProps> = ({
    data, 
    title
}) => {

    if (isEmpty(data)) {
        return null
    }

    // const {data} = useMovies()
    // console.log("movieList : ",data)

    return (
        <>
            <div className="px-4 md:px12 mt-5 space-y-8">
                <div>
                    <p className="text-white my-2 text-md md:text-xl lg:text-2xl font-semibold">
                        {title}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-2">
                        {data.map((movie) => (
                            <MovieCard key={movie.id} data={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieList