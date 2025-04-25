"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import type { Contact } from "@/types/contact"
import { formatPhoneInput } from "@/lib/format-phone"
import { STATE_DATA, updateState, cleanAddress } from "@/lib/clean-address"
import { getInitial } from "@/lib/get-initial"
import { Delete } from "./icons"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import AddressAutocomplete from "./address-autocomplete"

export default function EditForm({ contact, onClose, onUpdate, onDelete }: {
 contact: Contact,
 onClose: () => void,
 onUpdate: (updated: Contact) => void,
 onDelete: (deletedId: string) => void
}) {
 const [form, setForm] = useState({ ...contact })
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
   const res = await fetch(`/api/contacts/${contact.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalizedForm)
   })

   if (res.ok) {
    const updated = await res.json()
    onUpdate(updated)
    onClose()
    toast.success("Contact updated successfully!")
   } else {
    toast.error("Unable to update contact")
   }
  } catch (error) {
   console.error("Unable to update contact", error)
  }
 }

 const handleDelete = async () => {
  onDelete(contact.id)
  onClose()
  toast.success("Contact deleted successfully!")
  await fetch(`/api/contacts/${contact.id}`, {
   method: "DELETE"
  })
 }

 return (
  <div className="max-w-md w-full mx-auto py-8 px-4">
   <Avatar className="w-20 h-20 mx-auto mb-6">
    <AvatarFallback className="text-white text-2xl" style={{ backgroundColor: contact.avatarColor }}>{getInitial(contact.firstName)}</AvatarFallback>
   </Avatar>
   <h2 className="text-2xl text-center mb-6">Edit Contact</h2>
   <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
    <Input
     type="text"
     name="firstName"
     id="firstName"
     placeholder="First name"
     value={form.firstName}
     onChange={handleChange}
     required
    />
    <Input
     type="text"
     name="lastName"
     id="lastName"
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
     value={form.company || ""}
     onChange={handleChange}
    />
    <Input
     type="text"
     id="jobTitle"
     name="jobTitle"
     placeholder="Job title"
     value={form.jobTitle || ""}
     onChange={handleChange}
    />
    <div className="flex items-center justify-end gap-4">
     <AlertDialog>
      <AlertDialogTrigger asChild>
       <Button
        type="button"
        variant="delete"
        size="delete"
       >
        <Delete />
        Delete
       </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
       <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete this contact?</AlertDialogTitle>
        <AlertDialogDescription>This will permanently delete <strong className="font-bold">{contact.firstName} {contact.lastName}</strong>.</AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
        <AlertDialogCancel className="text-gray-500 transition hover:text-gray-700 border-none shadow-none">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete} className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 bg-transparent hover:bg-transparent shadow-none">
         <Delete />
         Delete
        </AlertDialogAction>
       </AlertDialogFooter>
      </AlertDialogContent>
     </AlertDialog>
     <Button type="submit" variant="save" size="save">{pending ? "Updating..." : "Update"}</Button>
    </div>
   </form>
  </div>
 )
}