const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require("path");

const contactsPath = path.join(__dirname,"db", "contacts.json");
console.log(contactsPath);


const listContacts = async () => {
const data = await fs.readFile(contactsPath);
return JSON.parse(data);
}

const getContactById = async (contactId) => {
 const contacts = await listContacts();
 const targetContact = contacts.find(item => item.id === contactId);
 return targetContact || null;
}

 const removeContact = async(contactId) => {
const contacts = await listContacts();
const index = contacts.findIndex(item => item.id === contactId);
if(index === -1) {
  return null;
} 
const [result] = contacts.splice(index, 1);
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
return result;
 }

 const addContact = async(data) => {
const contacts = await listContacts();
const newContact = {
  id: nanoid(),
  ...data,
};
contacts.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
return newContact;
 }

module.exports = {
listContacts,
getContactById,
addContact,
removeContact,
}
