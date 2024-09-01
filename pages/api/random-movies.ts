import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        console.log("Method not allowed !")
        return res.status(405).end()
    }

    try {
        // to check is userr logged in
        await serverAuth(req, res)

        const moviesCount = await prismadb.movie.count()

        const randomIndex = Math.floor(Math.random() * moviesCount)
        console.log("random index :",randomIndex)

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })


        console.log(randomMovies[0])

        res.status(200).json(randomMovies[0])
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}