/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { Pencil } from "lucide-react"

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
 }
}

export default async function ContactsTable() {
 const { contacts } = await getContacts()

 return (
  <div className="overflow-x-auto">
   <table className="table">
    <thead>
     <tr>
      {headers.map((header, i) => (
       <th key={i}>{header}</th>
      ))}
     </tr>
    </thead>
    <tbody>
     {contacts.map((contact: any) => (
      <tr key={contact._id}>
       <td>{contact.name}</td>
       <td>{contact.email}</td>
       <td>{contact.phone}</td>
       <td>
        <Link href={`/edit/${contact._id}`} className="btn btn-ghost">
         <Pencil className="w-4 h-4" />
        </Link>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 )
}