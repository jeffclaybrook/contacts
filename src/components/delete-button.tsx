"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export default function DeleteButton({ id }: { id: string }) {
 const router = useRouter()

 const deleteContact = async () => {
  const confirmed = confirm("Are you sure you want to delete this contact?")

  if (confirmed) {
   const res = await fetch(`http://localhost:3000/api/contacts?id=${id}`, {
    method: "DELETE"
   })

   if (res.ok) {
    router.push("/")
    router.refresh()
   }
  } 
 }

 return (
  <>
   <Button variant="destructive" onClick={deleteContact}>
    <Trash2 className="w-4 h-4" />
    Delete
   </Button>
  </>
 )
}