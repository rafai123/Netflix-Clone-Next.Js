import authOptions from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const serverSessionAuth = async (req: NextApiRequest, res: NextApiResponse ) => {
    try {
        const session = await getServerSession(authOptions)
    } catch (error) {
        console.log(error)
        throw new Error("error")
    }
}

export default serverSessionAuth