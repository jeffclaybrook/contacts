import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema({
 name: String,
 email: String,
 phone: String
}, {
 timestamps: true
})

const Contact = mongoose.models.ContactSchema || mongoose.model("Contact", ContactSchema)

export default Contact