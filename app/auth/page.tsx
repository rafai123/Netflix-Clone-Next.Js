// import Hero from "./../../public/images/Hero.png"
// import "app\globals.css"
"use client";
import { useCallback, useState } from "react";
import Input from "../components/Input"
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaGithub } from "react-icons/fa";


const Auth = () => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const [variant, setVariant] = useState("login")

    const toogleVariant = useCallback(() => {
        setVariant(variant === "login" ? "signup" : "login")
    },[variant])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl : '/'
            })

            router.push('/')

        } catch (error) {
            console.log(error)
        }
    }, [email, password, router])


    const register = useCallback(async () => {
        try {
            const response = await axios.post("/api/register", {
                email,
                password,
                userName
            })

            login()
            console.log(response)
        } catch ( error ) {
            console.log(error)
        }
    }, [email, userName, password, login])


    return (
        <div className="relative h-full w-full bg-[url('/images/Hero.svg')] bg-no-repeat bg-fixed bg-center bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-55">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Netflix Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className=" bg-black self-center p-16 rounded-md bg-opacity-70 mt-2 w-full lg:w-2/5 lg:max-w-md">
                        <h2 className="text-white text-4xl font-semibold mb-8">
                            {variant === 'login' ? 'Sign In' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'signup' && (
                                    <Input 
                                        id="name" 
                                        type="text" 
                                        label="Username" 
                                        onChange={(e:any) => setUserName(e.target.value)}
                                        value={userName}
                                    />
                                )}
                            <Input 
                                id="email" 
                                type="email" 
                                label="Email" 
                                onChange={(e:any) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Input 
                                id="password" 
                                type="password" 
                                label="Password" 
                                onChange={(e:any) =>  setPassword(e.target.value)}
                                value={password}
                            />
                            <div className="flex gap-4 flex-row items-center justify-center mt-8">
                                <div onClick={() => signIn('google', {callbackUrl: '/'})} className="bg-white h-10 w-10 rounded-full self-center  flex justify-center items-center cursor-pointer hover:opacity-80 transition">
                                    <FcGoogle size={30} />
                                </div>
                                <div onClick={() => signIn('github', {callbackUrl: '/'})} className="bg-white h-10 w-10 rounded-full self-center  flex justify-center items-center cursor-pointer hover:opacity-80 transition">
                                    <FaDiscord size={30} />
                                </div>
                                
                            </div>
                            <button onClick={(variant === "login") ? login : register} className="text-white bg-red-600 rounded-md w-full mt-10 py-3 hover:bg-red-700 transition">
                                {variant === 'login' ? "Login" : "Sign Up"}
                            </button>
                            <p className="text-neutral-500 mt-12 ">
                                { variant ==='login' ? "First time using Netflix?" : "Already have an account?"}
                                <span onClick={toogleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                    { variant === 'login' ? "Create an account" : "Login here" } 
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth