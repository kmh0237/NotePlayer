/*

    let: Used to declare a Variable (which is a way to store information).

    function: Declare a function (which is a way to share common code, calculate things and keep your code clean).

*/

// keeps track of what id things will be.
let keyId = -1;

window.addEventListener('load', function() {
    getKeys();
})

// Keeping track of the variable "keyId", adding to it, and returning it.
function setKeyId() {
    keyId = keyId + 1;
    return keyId;
}

// Setting the action of the key it's given
function setKeyAction(key) {
    key.addEventListener('click', function() {
        alert(key.id);
    });
}

// Getting the keys from the html and looping through them
function getKeys() {

    // This gets the keys from the html by finding the "piano-div", then getting all the divs (keys) underneath it.
    const keys = document.getElementById('piano-div').querySelectorAll('div');

    // Looping through the keys and setting their actions.
    keys.forEach(key => {
        key.id = setKeyId();
        setKeyAction(key);
    });
}
