import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { deleteDoc, doc } from "firebase/firestore"
import { db } from '../config/firebase'
import useDisclose from "../hooks/useDisclose";
import AddAndUpdate from "./AddAndUpdate";
import { toast } from "react-toastify"
const ContactCard = ({ contact }) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const DeleteContact = async (id) => {
        try {

            await deleteDoc(doc(db, "contacts", id));
            toast.success("contact deleted successfully")
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <div>
                <div key={contact.id} className="flex items-center justify-between rounded-lg bg-yellow p-2">
                    <div className="flex gap-1 items-center">
                        <HiOutlineUserCircle className="text-4xl text-orange" />
                        <div>
                            <h2 className="font-medium ">{contact.name}</h2>
                            <p className="text-sm ">{contact.email}</p>
                        </div>
                    </div>
                    <div className="flex text-3xl">
                        <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
                        <IoMdTrash onClick={() => DeleteContact(contact.id)} className="text-orange cursor-pointer" />
                    </div>
                </div>
            </div>
            <AddAndUpdate isUpdate contact={contact} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    );
}
export default ContactCard
