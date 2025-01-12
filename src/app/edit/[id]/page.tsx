/* eslint-disable @typescript-eslint/no-explicit-any */
import EditContact from "@/components/edit-contact"

async function getContactById(id: string) {
 try {
  const res = await fetch(`https://contacts-mmz4xn875-jeffs-projects-2f8cb560.vercel.app/api/contacts/${id}`, {
   cache: "no-store"
  })

  if (!res.ok) {
   throw new Error("Unable to fetch contact")
  }

  return res.json()
 } catch (error) {
  console.log(error)
 }
}

export default async function Edit({ params }: { params: any }) {
 const { id } = params
 const { contact } = await getContactById(id)
 const { name, email, phone } = contact

 return (
  <>
   <h1 className="text-2xl text-center mb-8">Edit contact</h1>
   <EditContact
    id={id}
    name={name}
    email={email}
    phone={phone}
   />
  </>
 )
}