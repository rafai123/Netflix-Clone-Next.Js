'use client'
import { signOut } from "next-auth/react"

const SignOutButtonHome =() => {
    return (
        <>
            <button className="h-10 w-full bg-white" onClick={() => signOut()}>Sign Out</button>
        </>
    )
}

export default SignOutButtonHome