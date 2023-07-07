/*

    let: Used to declare a Variable (which is a way to store information in your program)

    function: Declare a function (which is a way to share common code)

*/

let keyId = -1;

window.addEventListener('load', function() {
    getKeys();
})

// Keeping track of global variable keyid, incrementing it, and returning it
function setKeyId() {
    keyId = keyId + 1;
    return keyId;
}

// Setting the action of the key passed into it
function setKeyAction(key) {
    key.addEventListener('click', function() {
        alert(key.id);
    });
}

// Getting the keys from the html and looping through them
function getKeys() {
    // This gets the keys from the html, by first finding the #piano-div then getting all the divs underneath it in an array
    const keys = document.getElementById('piano-div').querySelectorAll('div');
    // Looping through the keys and setting their actions
    keys.forEach(key => {
        key.id = setKeyId();
        setKeyAction(key);
    });
}
