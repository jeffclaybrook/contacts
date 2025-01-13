"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import DeleteButton from "./delete-button"

interface EditContactProps {
 id: string
 name: string
 email: string
 phone: string
}

export default function EditContact({ id, name, email, phone }: EditContactProps) {
 const [newName, setNewName] = useState(name)
 const [newEmail, setNewEmail] = useState(email)
 const [newPhone, setNewPhone] = useState(phone)

 const router = useRouter()

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  try {
   const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({ newName, newEmail, newPhone })
   })

   if (res.ok) {
    router.push("/")
    router.refresh()
   } else {
    throw new Error("Unable to update contact")
   }
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <Card className="max-w-md mx-auto">
   <CardHeader>
    <CardTitle className="text-center">Edit contact</CardTitle>
   </CardHeader>
   <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
     <div className="space-y-1.5">
      <Label htmlFor="name">Name</Label>
      <Input
       type="text"
       id="name"
       placeholder="Name"
       value={newName}
       onChange={(e) => setNewName(e.target.value)}
      />
     </div>
     <div className="space-y-1.5">
      <Label htmlFor="email">Email</Label>
      <Input
       type="email"
       id="email"
       placeholder="Email"
       value={newEmail}
       onChange={(e) => setNewEmail(e.target.value)}
      />
     </div>
     <div className="space-y-1.5">
      <Label htmlFor="phone">Phone</Label>
      <Input
       type="text"
       id="phone"
       placeholder="Phone"
       value={newPhone}
       onChange={(e) => setNewPhone(e.target.value)}
      />
     </div>
     <div className="flex justify-end gap-1.5">
      <DeleteButton id={id} />
      <Button type="submit">Update</Button>
     </div>
    </form>
   </CardContent>
  </Card>
 )
}