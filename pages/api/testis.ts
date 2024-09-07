import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import prismadb from "@/lib/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).end()
    }

    const {movies} = req.body

    console.log(movies)

    
    
    movies.map(async (movie:any) => {

        // console.log(movie)
        
        try {
            await prismadb.movie.create({
                data: {
                    title: movie.title,
                    description: movie.description,
                    videoUrl: movie.videoUrl,
                    thumbnailUrl: movie.thumbnailUrl,
                    genre: movie.genre,
                    duration: movie.duration
                }
            })
            // console.log(movie)
        } catch (e) {
            console.log(e)
            return res.status(405).end()
        }

        // try {
            //     const {email, userName, password} = req.body
            //     const existingUser = await prismadb.user.findUnique({
        //         where: {
        //             email,
        //         }
        //     })
        
        //     if (existingUser) {
        //         return res.status(422).json({ error: "Email already used!"})
        //     }
    
        //     const hashedPassword = await bcrypt.hash(password, 12)
        
        //     const user = await prismadb.user.create({
        //         data: {
            //             email,
            //             name: userName,
            //             hashedPassword,
            //             image: "",
            //             emailVerified: new Date()
            //         }
            //     })
            
    })
    
    
    res.status(200).json({movies})
    // return res.status(200).json(user)
    // } catch (error) {
        //     console.log(error)
    //     return res.status(400).end()
    // }
}
