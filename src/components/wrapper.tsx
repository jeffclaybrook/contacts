"use client"

import { useState } from "react"
import type { Contact } from "@/types/contact"
import { Button } from "./ui/button"
import { Sheet, SheetContent } from "./ui/sheet"
import { Add } from "./icons"
import ContactsList from "./contacts-list"
import CreateForm from "./create-form"
import EditForm from "./edit-form"
import SearchBar from "./search-bar"

export default function Wrapper({ contacts: initialContacts }: { contacts: Contact[] }) {
 const [contacts, setContacts] = useState(initialContacts)
 const [filteredContacts, setFilteredContacts] = useState(initialContacts)
 const [isOpen, setIsOpen] = useState<boolean>(false)
 const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

 const handleSearch = (query: string) => {
  const results = contacts.filter((contact) =>
  [contact.firstName, contact.lastName, contact.phone, contact.email, contact.address, contact.company, contact.jobTitle]
   .filter(Boolean)
   .some((field) => field!.toLowerCase().includes(query))
  )
  setFilteredContacts(results)
 }

 const handleContactClick = (contact: Contact) => {
  setSelectedContact(contact)
  setIsOpen(true)
 }

 const handleNewContact = () => {
  setSelectedContact(null)
  setIsOpen(true)
 }

 const handleUpdate = (updated: Contact) => {
  const updatedContacts = contacts.some(contact => contact.id === updated.id)
   ? contacts.map(contact => contact.id === updated.id ? updated : contact)
   : [updated, ...contacts]
  updatedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName))
  setContacts(updatedContacts)
  setFilteredContacts(updatedContacts)
 }

 const handleDelete = (deletedId: string) => {
  const remaining = contacts.filter(contact => contact.id !== deletedId)
  setContacts(remaining)
  setFilteredContacts(remaining)
 }

 return (
  <>
   <SearchBar onSearch={handleSearch} />
   <ContactsList contacts={filteredContacts} onContactClick={handleContactClick} />
   <Button onClick={handleNewContact} variant="fab" size="fab">
    <Add />
    <span className="hidden lg:flex">Create</span>
   </Button>
   <Sheet open={isOpen} onOpenChange={setIsOpen}>
    <SheetContent side="bottom" className="h-[80vh] rounded-t-xl overflow-y-auto bg-[#f6fafe]">
     {selectedContact ? (
      <EditForm
       contact={selectedContact}
       onClose={() => setIsOpen(false)}
       onUpdate={handleUpdate}
       onDelete={handleDelete}
      />
     ) : (
      <CreateForm
       onSuccess={() => setIsOpen(false)}
       onContactCreated={handleUpdate}
      />
     )}
    </SheetContent>
   </Sheet>
  </>
 )
}