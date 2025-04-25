"use client"

import type { Contact } from "@/types/contact"
import { getInitial } from "@/lib/get-initial"
import { Avatar, AvatarFallback } from "./ui/avatar"
import EmptyState from "./empty-state"

type ContactsListProps = {
 contacts: Contact[]
 onContactClick: (contact: Contact) => void
}

export default function ContactsList({ contacts, onContactClick }: ContactsListProps) {
 return (
  <>
   {contacts.length === 0 ? (
    <EmptyState />
   ) : (
    <ul className="flex flex-col px-2 pb-2 pt-16 bg-[#f6fafe]">
     {contacts.map((contact) => (
      <li
       key={contact.id}
       onClick={() => onContactClick(contact)}
       className="flex items-center gap-4 cursor-pointer rounded-sm bg-[#f6fafe] md:hover:bg-[#edf2fc] text-[15px] text-[#1f1f1f] p-2"
      >
       <div className="flex items-center gap-2 max-w-xs w-full">
        <Avatar>
         <AvatarFallback className="text-white" style={{ backgroundColor: contact.avatarColor }}>{getInitial(contact.firstName)}</AvatarFallback>
        </Avatar>
        <h2>{contact.firstName} {contact.lastName}</h2>
       </div>
       <h3 className="hidden md:block flex-1">{contact.phone}</h3>
       <h3 className="hidden lg:block flex-1">{contact.email}</h3>
       <h3 className="hidden lg:block flex-1">{contact.address}</h3>
      </li>
     ))}
    </ul>
   )}
  </>
 )
}