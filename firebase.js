// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqMsuI7gHSo7OsOYb3xULZ9aIn6D29WJw",
  authDomain: "rsf-2024.firebaseapp.com",
  databaseURL: "https://rsf-2024-default-rtdb.firebaseio.com",
  projectId: "rsf-2024",
  storageBucket: "rsf-2024.appspot.com",
  messagingSenderId: "237606326555",
  appId: "1:237606326555:web:7501519efcb6e477a603be",
  measurementId: "G-43LSF4S6FE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const db = getDatabase(app);

const register = document.getElementById('register');
register.addEventListener("click", function(event){
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const form = document.getElementById('form');

    if(!(verFields(username, email, password) && verEmail(email) && verPassword(password)))
    {
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        
        set(ref(db, 'users/' + user.uid), {
            username: username,
            email: email,
            parola: password,
        });
        
        alert('Creating an Account');
        form.reset();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});

function verEmail(email)
{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex))
    {
        alert('Email-ul nu este valid');
        return false;
    } 
    else
    {
        return true;
    }
}

function verPassword(password)
{
    var validRegex = /^(?=.*[a-z])[\w!@#$%^&*?~()-]{6,}$/;
    if(!password.match(validRegex))
    {
        alert('Parola nu este valida');
        return false;
    }
    else
    {
        return true;
    }
}

function verFields(username, email, password)
{
    if(username === null) 
    {
        alert('Numele de utilizator lipseste');
        return false;
    }
    if(email === null)
    {
        alert('Email-ul lipseste');
        return false;
    }
    if(password === null)
    {
        alert('Parola lipseste');
        return false;
    }
    return true;
}