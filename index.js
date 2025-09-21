import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-main-48ae2-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const shoppingList = document.getElementById('shopping-list');
const inputField = document.getElementById('input-field');
const addbutton = document.getElementById('add-button');

addbutton.addEventListener('click', function() {
    let inputValue = inputField.value;
    push(shoppingListInDB, inputValue);
    
    clearInputField();
});

onValue(shoppingListInDB, function(snapshot) {
    shoppingList.innerHTML = "";
    let itemsArray = Object.values(snapshot.val());
    
    for (let i = 0; i < itemsArray.length; i++) {
        addItem(itemsArray[i]);
    }
});

function clearInputField() {
    inputField.value = "";
}

function addItem(itemValue) {
    shoppingList.innerHTML += `<li>${itemValue}</li>`;
}