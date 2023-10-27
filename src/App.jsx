import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import ContactCard from './components/ContactCard'
import { FiSearch } from 'react-icons/Fi'
import { AiFillPlusCircle } from 'react-icons/Ai'
import { useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import { db } from './config/firebase'
import AddAndUpdate from './components/AddAndUpdate'
import useDisclose from './hooks/useDisclose'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nodata from './components/Nodata'



const App = () => {
  const [contacts, setContactsh] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setContactsh(contactLists);
          return contactLists;
        })

      }
      catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, []);
  const filterContact = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      const filteredContacts = contactLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()))
      setContactsh(filteredContacts);
      return filteredContacts;
    })

  }
  return (
    <>
      <div className="max-w-[370px] mx-auto">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="ml-1 absolute text-white text-3xl" />
            <input onChange={filterContact} type="text" className="pl-9 text-white h-10 flex-grow border  border-white bg-transparent rounded-md" />
          </div>
          <AiFillPlusCircle onClick={onOpen} className=" cursor-pointer text-white text-5xl" />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {contacts.length <= 0 ? <Nodata /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onClose={onClose} />
      <ToastContainer
        position='bottom-center' />
    </>
  );
};

export default App