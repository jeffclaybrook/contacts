"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Create() {
 const [name, setName] = useState("")
 const [email, setEmail] = useState("")
 const [phone, setPhone] = useState("")

 const router = useRouter()

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  if (!name || !email || !phone) {
   alert("All fields are required")
  }

  try {
   const res = await fetch("http://localhost:3000/api/contacts/", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone })
   })

   if (res.ok) {
    router.push("/")
    router.refresh()
   } else {
    throw new Error("Unable to create contact")
   }
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <Card className="max-w-md mx-auto">
   <CardHeader>
    <CardTitle className="text-center">Create contact</CardTitle>
   </CardHeader>
   <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
     <div className="space-y-1.5">
      <Label htmlFor="name">Name</Label>
      <Input
       type="text"
       id="name"
       placeholder="Name"
       value={name}
       onChange={(e) => setName(e.target.value)}
      />
     </div>
     <div className="space-y-1.5">
      <Label htmlFor="email">Email</Label>
      <Input
       type="email"
       id="email"
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />
     </div>
     <div className="space-y-1.5">
      <Label htmlFor="phone">Phone</Label>
      <Input
       type="text"
       id="phone"
       placeholder="Phone"
       value={phone}
       onChange={(e) => setPhone(e.target.value)}
      />
     </div>
     <div className="flex justify-end gap-1.5">
      <Button variant="ghost" type="button" asChild>
       <Link href={"/"}>Cancel</Link>
      </Button>
      <Button type="submit">Create</Button>
     </div>
    </form>
   </CardContent>
  </Card>
 )
}