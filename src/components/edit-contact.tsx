"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import DeleteButton from "./delete-button"

interface EditContactProps {
 id: string
 name: string
 email: string
 phone: string
}

export default function EditContact({
 id,
 name,
 email,
 phone
}: EditContactProps) {
 const [newName, setNewName] = useState(name)
 const [newEmail, setNewEmail] = useState(email)
 const [newPhone, setNewPhone] = useState(phone)

 const router = useRouter()

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  try {
   const res = await fetch(`https://contacts-eosin-two.vercel.app/api/contacts/${id}`, {
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
  <>
   <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mb-4">
    <label className="input input-bordered flex items-center gap-2">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
     </svg>
     <input
      type="text"
      id="name"
      name="name"
      placeholder="Name"
      className="input-md grow"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
     />
    </label>
    <label className="input input-bordered flex items-center gap-2">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
     </svg>
     <input
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      className="input-md grow"
      value={newEmail}
      onChange={(e) => setNewEmail(e.target.value)}
     />
    </label>
    <label className="input input-bordered flex items-center gap-2">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
     >
      <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" fillRule="evenodd" />
     </svg>
     <input
      type="text"
      id="phone"
      name="phone"
      placeholder="Phone"
      className="input-md grow"
      value={newPhone}
      onChange={(e) => setNewPhone(e.target.value)}
     />
    </label>
    <button type="submit" className="btn btn-primary btn-block">Update</button>    
   </form>
   <DeleteButton id={id} />
  </>
 )
}