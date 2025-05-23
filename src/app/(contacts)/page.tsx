import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { decrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import Wrapper from "@/components/wrapper"

export default async function Contacts() {
 const { userId } = await auth()

 if (!userId) {
  return redirect("/sign-in")
 }

 const contacts = await prisma.contact.findMany()

 const decrypted = contacts.map((contact) => ({
  ...contact,
  firstName: decrypt(contact.firstName),
  lastName: decrypt(contact.lastName),
  phone: decrypt(contact.phone),
  email: decrypt(contact.email),
  address: decrypt(contact.address),
  company: contact.company ? decrypt(contact.company) : null,
  jobTitle: contact.jobTitle ? decrypt(contact.jobTitle) : null
 }))

 const sorted = decrypted.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()))

 return (
  <>
   <Wrapper contacts={sorted} />
  </>
 )
}