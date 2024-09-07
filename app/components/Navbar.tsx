import { BsBell, BsChevronDoubleDown, BsChevronDown, BsSearch } from "react-icons/bs"
import NavbarItem from "./NavbarItem"
import MobileMenu from "./MobileMenu"
import { useCallback, useEffect, useState } from "react"
import AccountMenu from "./AccountMenu"
import Image from "next/image"

const TOP_OFFSET = 66

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setshowBackground] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu(!showMobileMenu)
    }, [showMobileMenu])

    const toggleAccountMenu = () => {
        setShowAccountMenu(!showAccountMenu)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setshowBackground(true)
            } else {
                setshowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div className="w-full fixed z-40">
                <div 
                    className={`
                        px-4
                        md:px-16
                        py-6
                        flex
                        flex-row
                        items-center
                        transition
                        duration-500
                        ${showBackground ?  "bg-zinc-900 bg-opacity-90": "bg-transparent"}

                    `}
                >
                    <Image className="h-9 lg:h-12" width={105} height={25} src="/images/logo.png" alt="Netflix" />
                    <div
                        className="
                            flex-row
                            ml-8
                            gap-7
                            hidden
                            lg:flex
                        "
                    >
                        <NavbarItem label="Home" />
                        <NavbarItem label="Series" />
                        <NavbarItem label="Films" />
                        <NavbarItem label="New & Popular" />
                        <NavbarItem label="My List" />
                        <NavbarItem label="Browse by Languages" />
                    </div>
                    <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                        <p className="text-white text-sm">Browse</p>
                        <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
                        <MobileMenu visible={showMobileMenu} />
                    </div>
                    <div className="flex ml-auto gap-7 items-center">
                        <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                            <BsSearch />
                        </div>
                        <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                            <BsBell />
                        </div>
                        <div onClick={toggleAccountMenu} className="flex items-center gap-2 cursor-pointer relative">
                            <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-md overflow-hidden">
                                <Image width={40} height={40} className="rounded-md" src="/images/netflix_default_blue.png" alt="Profile" /> 
                            </div>
                            <BsChevronDown className={`text-white transition ${(showAccountMenu) ? "rotate-180" : "rotate-0"} `} />
                            <AccountMenu visible={showAccountMenu} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar