// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";

// import prismadb from "@/lib/prismadb"

// const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {

    
//     const session = await getSession({ req })

//     if (!session?.user?.email) {
//         console.log('not signed in')
//         throw new Error('Not signed in')
//     }

//     console.log("from lib/serverAuth :", session.user.email)

//     const currentUser = await prismadb.user.findUnique({
//         where: {
//             email: session.user.email,
//         }
//     })

//     console.log("current", currentUser)

//     if (!currentUser) {
//         console.log('not signed in')
//         throw new Error('Not signed in');
//     }

//     return {currentUser}

//     } catch (error) {
//         console.log("serverAuth Error :", error)
//         throw new Error("error")
//     }
// };

// export default serverAuth

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const session = await getSession({ req });
        const session = await getServerSession(req, res, authOptions);

        // console.log("Session Object:" , session)

        if (!session?.user?.email) {
            console.log('Session is invalid or user is not signed in');
            throw new Error('Not signed in');
        }

        // console.log("Session found for email:", session.user.email);

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!currentUser) {
            console.log('No user found for this email:', session.user.email);
            throw new Error('User not found');
        }

        return { currentUser };
    } catch (error) {
        console.error('Error in serverAuth:', error);
        throw new Error('Authentication failed');
    }
};

export default serverAuth;
