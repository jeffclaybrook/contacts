import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"

export default function CreateButton() {
 return (
  <Button className="fixed bottom-8 right-8" asChild>
   <Link href={"/create"}>
    <Plus />
    Create
   </Link>
  </Button>
 )
}