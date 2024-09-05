import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method !== "GET") {
    //     console.log("Method not allowed!")
    //     return res.status(405).end()
    // }


    
    try {

        if (req.method === 'GET') {

        
        const { currentUser } = await serverAuth(req, res)

        console.log("From movies.ts", currentUser)

        const movies = await prismadb.movie.findMany()

        return res.status(200).json(movies)
        }

        if (req.method === "POST") {
            const { currentUser } = await serverAuth(req, res)

            const { movieId } = req.body

            console.log("Favorite.ts :", currentUser)

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!existingMovie) {
                throw new Error("Invalid ID")
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            })
            res.status(200).json(user)
        }

        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req, res)

            const { movieId } = req.body

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!existingMovie) {
                throw new Error("Invalid ID")
            }

            // const existingUserMovie = await prismadb.user.findUnique({
            //     where: {
            //         email: currentUser.email || '',
            //     }
            // })

            const newFavoriteMovie = without(currentUser.favoriteIds, movieId)

            const updatedFavorite = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: newFavoriteMovie
                }
            })

            return res.status(200).json(updatedFavorite)
        }
        
        return res.status(405).end()
        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}