"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/react";

// Material UI Icons
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700 text-sm hidden sm:block">{session?.user?.name}</span>
        <Button
          onClick={() => signOut()}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: '9999px',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': { borderColor: 'primary.dark', backgroundColor: 'primary.light' }
          }}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => signIn()}
      variant="contained"
      size="small"
      sx={{
        textTransform: 'none',
        borderRadius: '9999px',
        backgroundColor: 'primary.main',
        '&:hover': { backgroundColor: 'primary.dark' }
      }}
    >
      Login
    </Button>
  );
}

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 shadow-md border-b border-gray-200">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link href="/">
          <Image src="/next.svg" alt="logo" width={50} height={10} className="cursor-pointer" />
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/dashboard" passHref>
            <Button color="inherit" sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Dashboard</Button>
          </Link>
          <Link href="/transactions" passHref>
            <Button color="inherit" sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Transactions</Button>
          </Link>
          <Link href="/transactions/add_transactions" passHref>
            <Button color="inherit" sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Add Transactions</Button>
          </Link>
        </div>
      </div>

      {/* Right Section: Icons and Auth Button */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <Link href="/settings" passHref>
          <Button
            variant="text"
            color="inherit"
            sx={{ minWidth: 'auto', padding: '8px', borderRadius: '9999px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <SettingsIcon sx={{ fontSize: 22 }} />
          </Button>
        </Link>
        <Link href="/profile" passHref>
          <Button
            variant="text"
            color="inherit"
            sx={{ minWidth: 'auto', padding: '8px', borderRadius: '9999px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <AccountCircleIcon sx={{ fontSize: 22 }} />
          </Button>
        </Link>
        <Link href="/notifications" passHref>
          <Button
            variant="text"
            color="inherit"
            sx={{ minWidth: 'auto', padding: '8px', borderRadius: '9999px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 22 }} />
          </Button>
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
};

export default Navbar;
