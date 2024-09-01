
'use client'
import { NextPageContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignOutButtonHome from "./components/SignOutButtonHome";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "./components/Navbar";
import Billboard from "./components/Billboard";

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context)

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

export default function Home() {

  // const {data: session, status} = useSession();
  const router =  useRouter();

  const {data: session, status, update} = useSession()

  if (status === "unauthenticated") {
    router.push("/auth")
  }

  const {data : user} = useCurrentUser()

  return (
    (session && status === "authenticated") &&
    <>
      <Navbar />
      {/* <SignOutButtonHome /> */}
      <Billboard />
    </>
  );
}
