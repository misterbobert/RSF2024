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
let output='';
function twofishRegister(inputOut)
{
    // Funcție pentru a converti un șir de caractere în binar
    function stringToBinary(input) {
        return input.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0'); // Convertim fiecare caracter în cod ASCII
        }).join('');
    }

    // Funcție pentru a converti un șir binar în text (binar -> ASCII)
    function binaryToString(binary) {
        let result = '';
        for (let i = 0; i < binary.length; i += 8) {
            let byte = binary.slice(i, i + 8);
            result += String.fromCharCode(parseInt(byte, 2));
        }
        return result;
    }

    // Funcție simplificată de criptare (folosind XOR)
    function simpleEncrypt(plainText, key) {
        const binaryInput = stringToBinary(plainText);
        const binaryKey = stringToBinary(key).padEnd(binaryInput.length, '0'); // Asigurăm că cheia are aceeași lungime ca inputul

        // Criptare prin XOR
        const encrypted = binaryInput.split('').map((bit, index) => {
            return bit === binaryKey[index] ? '0' : '1'; // XOR
        }).join('');

        return encrypted;
    }

    // Funcție simplificată de decriptare
    function simpleDecrypt(encryptedText, key) {
        const binaryKey = stringToBinary(key).padEnd(encryptedText.length, '0'); // Asigurăm că cheia are aceeași lungime ca inputul

        // Decriptare prin XOR
        const decrypted = encryptedText.split('').map((bit, index) => {
            return bit === binaryKey[index] ? '0' : '1'; // XOR
        }).join('');

        return binaryToString(decrypted);
    }

    // Funcția principală
    function main() {
        const key = 'rsf2024'; // Cheia pentru criptare (8 caractere)
        const plainText = inputOut; // Mesajul pe care dorim să-l criptăm

        let encryptedText = '';
        let decryptedText = '';

        encryptedText = simpleEncrypt(plainText, key);
        decryptedText = simpleDecrypt(encryptedText, key);

        output = encryptedText;
    }

    // Executăm funcția principală
    main();
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const db = getDatabase(app);

const register = document.getElementById('register');
register.addEventListener("click", function(event){
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    twofishRegister(document.getElementById('password').value);
    const password = output;

    console.log(password);

    const form = document.getElementById('form');

    if(!(verFields(username, email, password) && verEmail(email)))
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