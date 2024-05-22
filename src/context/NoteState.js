import { useState } from "react";
import NoteContext from "./NoteContext";    
const NoteState = (props) => {
    
    const notesInitial = [
        { "id": 1, "first_name": "Devendra","last_name": "Raj", "email": "dev@gmail.com" },
        { "id": 2, "first_name": "Dev","last_name": "Shukla", "email": "dev1@gmail.com" }
    ];
    const [notes,setNotes] = useState(notesInitial);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3000/users`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((result) => {
            setNotes(result);
            console.log(result,'json');  
        })
        .catch((error) => {
            console.log(error,'getUser api call error');
        });
         // eslint-disable-next-line
    }
    
    const addUser = async (first_name, last_name, emailid) => {
        let user = {
            "id":`${Date.now()}`,
            "first_name": first_name,
            "last_name": last_name,
            "email": emailid,
        };
        setNotes(notes.concat(user));
        const response = await fetch(`http://localhost:3000/users`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const json = await response.json(); 
        console.log(json,'json');       
    }

    const DeleteUser = async (id) => {
        const newUserObj = notes.filter((note)=>{return note.id!==id});
        setNotes(newUserObj);
        const response = await fetch(`http://localhost:3000/users/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json(); 
        console.log(json,'json');  
    }

    const EditUser = async (id, first_name, last_name, emailid) => {
        let user = {
            "id":id,
            "first_name": first_name,
            "last_name": last_name,
            "email": emailid,
        };
        const response = await fetch(`http://localhost:3000/users/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const json = await response.json(); 
        let newuser = JSON.parse(JSON.stringify(notes));
        for(let i=0;i<newuser.length;i++) {
            if(newuser[i].id === id) {
                newuser[i].first_name = first_name;
                newuser[i].last_name = last_name;
                newuser[i].email = emailid;
                break;
            }
        }
        setNotes(newuser);
    }

    return (
        <NoteContext.Provider value={{notes,getUser,addUser,EditUser,DeleteUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;