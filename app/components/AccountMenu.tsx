import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: FC<AccountMenuProps> = ({ visible }) => {
    // Call useSession hook unconditionally
    const { data: session } = useSession();

    // Conditionally render the component based on the 'visible' prop
    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/netflix_default_blue.png" alt="" />
                    <p className="text-white group-hover/item:underline group-hover/item:text-gray-300 text-sm">
                        {session?.user?.name}
                    </p>
                </div>
                <hr className="my-3 border-0 border-gray-500 border-b-2" />
                <div onClick={() => signOut()} className="text-white text-center text-sm hover:text-gray-300 hover:underline">
                    Sign Out of Netflix
                </div>
            </div>
        </div>
    );
}

export default AccountMenu;
