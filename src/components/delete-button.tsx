"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

export default function DeleteButton({ id }: { id: string }) {
 const router = useRouter()

 const deleteContact = async () => {
  const confirmed = confirm("Are you sure you want to delete this contact?")

  if (confirmed) {
   const res = await fetch(`https://contacts-eosin-two.vercel.app/api/contacts?id=${id}`, {
    method: "DELETE"
   })

   if (res.ok) {
    router.push("/")
    router.refresh()
   }
  } 
 }

 return (
  <form action={deleteContact} className="max-w-md mx-auto">
   <button type="submit" className="btn btn-outline btn-error btn-block">
    <Trash2 className="w-4 h-4" />
    Delete
   </button>
  </form>
 )
}