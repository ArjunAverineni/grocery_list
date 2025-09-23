import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const appSettings = {
    apiKey: "AIzaSyCtX_6_YUgeIs_mrbodPgceWvsuEnT-uDU",
    authDomain: "playground-main-48ae2.firebaseapp.com",
    databaseURL: "https://playground-main-48ae2-default-rtdb.firebaseio.com",
    projectId: "playground-main-48ae2",
    storageBucket: "playground-main-48ae2.firebasestorage.app",
    messagingSenderId: "81721792194",
    appId: "1:81721792194:web:2244ed53f45adaaa28cd5b",
    measurementId: "G-1KR1519GMK"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const auth = getAuth(app);
const shoppingList = document.getElementById('shopping-list');
const inputField = document.getElementById('input-field');
const addbutton = document.getElementById('add-button');
let shoppingListInDB;

function clearShoppingList() {
    shoppingList.innerHTML = "";
}

function clearInputField() {
    inputField.value = "";
}

function addItem(item, UID) {
    //shoppingList.innerHTML += `<li>${itemValue}</li>`;
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener('click', function() {
        let exactLocation = ref(database, `${UID}/shoppingList/${itemID}`);
        remove(exactLocation);
    })


    shoppingList.append(newEl);
}

onAuthStateChanged(auth, function(user) {
    if (user) {
        const UID = user.uid;

        shoppingListInDB = ref(database, `${UID}/shoppingList`);

        addbutton.addEventListener('click', function() {
            let inputValue = inputField.value;
            push(shoppingListInDB, inputValue);
            clearInputField();
        });

        onValue(shoppingListInDB, function(snapshot) {
            if (snapshot.exists()) {
                let itemsArray = Object.entries(snapshot.val());
                clearShoppingList();

                for (let i = 0; i < itemsArray.length; i++) {
                    let currentItem = itemsArray[i];
                    
                    let currentItemID = currentItem[0];
                    let currentItemValue = currentItem[1];

                    addItem(currentItem, UID);
                }
            }
            else {
                shoppingList.innerHTML = "No items here... yet";
            }
        });
    }
    else {
        window.alert("You must be logged in");
        window.location.href = "index.html";
    }
});