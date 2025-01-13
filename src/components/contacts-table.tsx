/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const headers = ["Name", "Email", "Phone", "Action"]

async function getContacts() {
 try {
  const res = await fetch("http://localhost:3000/api/contacts", {
   cache: "no-store"
  })

  if (!res.ok) {
   throw new Error("Unable to fetch contacts")
  }

  return res.json()
 } catch (error) {
  console.log("Unable to load contacts", error)
  return null
 }
}

export default async function ContactsTable() {
 const { contacts } = await getContacts()

 return (
  <Table>
   <TableHeader>
    <TableRow>
     {headers.map((header, i) => (
      <TableHead key={i}>{header}</TableHead>
     ))}
    </TableRow>
   </TableHeader>
   <TableBody>
    {contacts.map((contact: any) => (
     <TableRow key={contact._id}>
      <TableCell className="font-medium">{contact.name}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.phone}</TableCell>
      <TableCell>
       <Button variant="outline" size="icon" asChild>
        <Link href={`/edit/${contact._id}`}>
         <Pencil className="h-4 w-4" />
        </Link>
       </Button>
      </TableCell>
     </TableRow>
    ))}
   </TableBody>
  </Table>
 )
}