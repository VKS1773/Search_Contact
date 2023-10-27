
import Model from './Model'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"
import { db } from '../config/firebase'
import { toast } from "react-toastify"

import * as Yup from "yup"


const contactsSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required")
}

)
const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
    const AddContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts")
            await addDoc(contactRef, contact)
            toast.success("contact Added successfully")

            onClose();

        }
        catch (error) {
            console.log(error)
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id)
            await updateDoc(contactRef, contact)
            toast.success("contact Updated successfully")
            onClose();
        }
        catch (error) {
            console.log(error)
        }
    }
    return (

        <div>
            <div className="max-w-[200px]">
                <Model isOpen={isOpen} onClose={onClose}>
                    <Formik
                        validationSchema={contactsSchemaValidation}
                        initialValues={
                            isUpdate ? {
                                name: contact.name,
                                email: contact.email

                            }
                                : {
                                    name: "",
                                    email: ""
                                }}
                        onSubmit={(values) => {
                            isUpdate ? updateContact(values, contact.id) : AddContact(values);

                        }}>
                        <Form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name">Name</label>
                                <Field name="name" className=" pl-2 border h-10" />
                                <div className="text-xs text-red-500">
                                    <ErrorMessage className="text-xs text-red-500" name="name" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="emial">Email</label>
                                <Field type="email" name="email" className="border h-10 pl-2" />
                                <div className="text-xs text-red-500">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <button type="submit" className="bg-darkyellow border px-2 py-1.5 self-end rounded-md">{isUpdate ? "Update" : "Add"} Contact</button>
                        </Form>
                    </Formik>
                </Model>
            </div>
        </div>
    )
}

export default AddAndUpdate