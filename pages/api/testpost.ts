import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try {
        if (req.method === "POST") {
            console.log("post", req.body)
            const data = req.body

            const session = await serverAuth(req, res)

            console.log("Session from testpost", session)
            
            return res.status(200).json({message: "success POST", session, data})
        }
        if (req.method === "DELETE") {
            console.log("DELETE", req.body)
            const data = req.body
            const {currentUser } = await serverAuth(req, res)
            
            return res.status(200).json({message: "success DELETE", data, currentUser})
        }

        if (req.method === "GET") {
            console.log("GET")
            const {currentUser } = await serverAuth(req, res)

            return res.status(200).json({message: "Success GET", currentUser})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}