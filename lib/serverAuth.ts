import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb"

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session?.user?.email) {
        console.log('not signed in')
        throw new Error('Not signed in')
    }

    console.log("from lib/serverAuth :", session.user.email)

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    })

    if (!currentUser) {
        console.log('not signed in')
        throw new Error('Not signed in');
    }

    return {currentUser}
};

export default serverAuth