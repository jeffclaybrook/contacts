import Link from "next/link"
import { Plus } from "lucide-react"

export default function CreateButton() {
 return (
  <Link href={"/create"} className="btn btn-primary fixed bottom-8 right-8">
   <Plus />
   Create
  </Link>
 )
}