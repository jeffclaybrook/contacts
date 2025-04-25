"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useFormStatus } from "react-dom"
import { formatPhoneInput } from "@/lib/format-phone"
import { STATE_DATA, updateState, cleanAddress } from "@/lib/clean-address"
import type { Contact } from "@/types/contact"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { SheetClose } from "./ui/sheet"
import AddressAutocomplete from "./address-autocomplete"

export default function CreateForm({ onSuccess, onContactCreated }: {
 onSuccess: () => void,
 onContactCreated: (created: Contact) => void
}) {
 const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  company: "",
  jobTitle: ""
 })
 
 const { pending } = useFormStatus()

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value })
 }

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  const cleaned = cleanAddress(form.address)
  const updated = updateState(cleaned, STATE_DATA)

  const normalizedForm = {
   ...form,
   address: updated
  }

  try {
   const res = await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalizedForm)
   })

   if (res.ok) {
    const created = await res.json()
    onContactCreated(created)
    onSuccess()
    toast.success("Contact created successfully!")
   } else {
    toast.error("Unable to create contact")
   }
  } catch (error) {
   console.error("Error creating contact", error)
  }
 }

 return (
  <div className="max-w-md w-full mx-auto py-8 px-4">
   <h2 className="text-2xl text-center mb-6">Create Contact</h2>
   <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
    <Input
     type="text"
     id="firstName"
     name="firstName"
     placeholder="First name"
     value={form.firstName}
     onChange={handleChange}
     required
    />
    <Input
     type="text"
     id="lastName"
     name="lastName"
     placeholder="Last name"
     value={form.lastName}
     onChange={handleChange}
     required
    />
    <Input
     type="text"
     id="phone"
     name="phone"
     placeholder="Phone"
     value={formatPhoneInput(form.phone)}
     onChange={(e) => {
      setForm((prev) => ({
       ...prev,
       phone: formatPhoneInput(e.target.value)
      }))
     }}
     required
    />
    <Input
     type="email"
     id="email"
     name="email"
     placeholder="Email"
     value={form.email}
     onChange={handleChange}
     required
    />
    <AddressAutocomplete
     value={form.address}
     onChange={(value) => setForm({ ...form, address: value })}
    />
    <Input
     type="text"
     id="company"
     name="company"
     placeholder="Company"
     value={form.company}
     onChange={handleChange}
    />
    <Input
     type="text"
     id="jobTitle"
     name="jobTitle"
     placeholder="Job title"
     value={form.jobTitle}
     onChange={handleChange}
    />
    <div className="flex items-center justify-end gap-4">
     <SheetClose asChild>
      <Button type="button" variant="cancel" size="cancel">Cancel</Button>
     </SheetClose>
     <Button type="submit" variant="save" size="save">{pending ? "Saving..." : "Save"}</Button>
    </div>
   </form>
  </div>
 )
}