import { useUserContext } from "@/contexts/UserContext";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { token, getUser, logout } = useUserContext();
  const navigation = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        setLoggedInUser(await getUser(token));
      }
    }
    fetchUser();
  }, [token]);

  function handlerLogout() {
    logout();
    localStorage.removeItem("token");
  }
  return (
    <div className="w-full theme-custom bg-background">
      <div className="rounded-lg text-card-foreground shadow-sm">
        <header className="bg-card">
          <nav className="flex gap-2 justify-between h-16 items-center container ">
            <div>
              <Link to="/" className="text-primary font-bold border-4 p-2 ">
                Task Manager
              </Link>
            </div>
            {/* <ul className="flex gap-2">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/task">Tasks</Link>
              </li>
            </ul> */}
            {token ? (
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-10 w-10 font-bold">
                      {/* <AvatarImage src={loggedInUser?.img} /> */}
                      <AvatarFallback className="">
                        {loggedInUser?.firstname[0].toUpperCase()}{" "}
                        {loggedInUser?.lastname[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="theme-custom bg-background">
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem>
                      <Link>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/task">My Tasks</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Logout</DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <Link onClick={handlerLogout}>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <ul className="flex gap-2">
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/auth/register">Sign up</Link>
                </li>
              </ul>
            )}
          </nav>
        </header>
      </div>
    </div>
  );
}
