/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import Contact from "@/models/contact"
import db from "@/lib/db"

export async function PUT(req: any, {
 params
}: {
 params: any
}) {
 const { id } = params
 const {
  newName: name,
  newEmail: email,
  newPhone: phone
 } = await req.json()
 await db()
 await Contact.findByIdAndUpdate(id, { name, email, phone })
 return NextResponse.json({
  message: "Contact succesfully updated"
 }, { status: 200 })
}

export async function GET(req: any, {
 params
}: {
 params: any
}) {
 const { id } = params
 await db()
 const contact = await Contact.findOne({
  _id: id
 })
 return NextResponse.json({ contact }, { status: 200 })
}