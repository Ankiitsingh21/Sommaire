import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto ">
      <div className="flex lg:flex-1">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-800 hover:rotate-12 transform transition duration-200 ease-in-out " />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Sommaire
          </span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaires</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a PDf</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <div>
            <NavLink href={"/sign-in"}>Sign-in</NavLink>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
