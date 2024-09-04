import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb'
import { without } from "lodash";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    
    try {
        if (req.method === "POST") {
            const { currentUser } = await serverAuth(req, res)

            const {movieId} = req.body

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!existingMovie) {
                throw new Error("Invalid ID")
            }

            const response = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            })
            res.status(200).json(response)
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

            const newFavoriteMovie = without(currentUser?.favoriteIds, movieId)

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