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

// Getting the keys from the DOM and looping through them
function getKeys() {
    const keys = document.getElementById('piano-div').querySelectorAll('div');
    keys.forEach(key => {
        key.id = setKeyId();
        setKeyAction(key);
    });
}
