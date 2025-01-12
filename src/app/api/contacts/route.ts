/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import Contact from "@/models/contact"
import db from "@/lib/db"

export async function GET() {
 await db()
 const contacts = await Contact.find()
 return NextResponse.json({ contacts })
}

export async function POST(req: any) {
 const { name, email, phone } = await req.json()
 await db()
 await Contact.create({ name, email, phone })
 return NextResponse.json({
  message: "Contact successfully created"
 }, { status: 201 })
}

export async function DELETE(req: any) {
 const id = req.nextUrl.searchParams.get("id")
 await db()
 await Contact.findByIdAndDelete(id)
 return NextResponse.json({
  message: "Contact successfully deleted"
 }, { status: 200 })
}