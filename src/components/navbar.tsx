import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"

export default function Navbar() {
 return (
  <nav className="flex items-center p-4">
   <div className="flex-1">
    <Button variant="ghost" asChild>
     <Link href={"/"}>Contacts</Link>
    </Button>
   </div>
   <div className="flex-none">
    <ThemeToggle />
   </div>
  </nav>
 )
}