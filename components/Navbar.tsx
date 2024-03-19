"use client";

import React from "react";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosLogIn } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import Button from "@mui/material/Button";
import {signIn,signOut,useSession} from "next-auth/react";

function AuthButton(){
  const {data:session}=useSession();
  if (session){
    return(
      <div>
        {session?.user?.name}
        <Button onClick={()=>{signOut()}}>SignOut</Button>
      </div>
    )
  }
  return(
    <div>
      Login
      <Button onClick={()=>signIn()}>Login</Button>
    </div>
  ) 
}

const Navbar = () => {
  return (
    <nav className="flex justify-between item-center h-2 p-4 z-100 border-b-[1px] shadow-md">
      {/* left section */}
      <div className="flex gap-5 items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/next.svg" alt="logo" width={50} height={10}></Image>
          </Link>
        </div>
        <div
          className="flex justify-between items-center px-3 py-1 
        hover:font-medium
        rounded-xl"
        >
          <Link href="/dashboard">
            <Button className="hover:bg-gray-200">Dashboard</Button>
          </Link>
        </div>
        <div
          className="flex justify-between items-center px-3 py-1 
        hover:font-medium
        rounded-xl"
        >
          <Link href="/transactions">
            <Button className="hover:bg-gray-200">Transactions</Button>
          </Link>
        </div>

        <div
          className="flex justify-between items-center px-3 py-1 
        hover:font-medium
        rounded-xl"
        >
          <Link href="/transactions/add_transactions">
            <Button className="hover:bg-gray-200">Add Transactions</Button>
          </Link>
        </div>
      </div>

      {/* right section */}
      <div className="flex items-center justify-between gap-5">
        <div
          className="flex flex-row justify-between items-center 
        hover:bg-gray-300 rounded-full p-1"
        >
          <Link href="/" className="">
            <IoIosSettings size="22px" />
          </Link>
        </div>
        <div
          className="flex flex-row justify-between items-center 
        hover:bg-gray-300 rounded-full p-1"
        >
          <Link href="/">
            <CgProfile size="22px" />
          </Link>
        </div>
        <div
          className="flex flex-row justify-between items-center 
        hover:bg-gray-300 rounded-full p-1"
        >
          <Link href="/">
            <IoIosNotificationsOutline size="22px" />
          </Link>
        </div>
        <AuthButton/>
        {/* <Button variant="contained" className="flex rounded-full bg-blue-600">
          Log in
        </Button> */}
        {/* <CustomButton
          title="Log in"
          type="button"
          bgColor="primary-blue"
          handleClick={() => console.log("1")}
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
