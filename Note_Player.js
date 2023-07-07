let keyId = -1;

window.addEventListener('load', function() {
    getKeys();
})

function setKeyId() {
    keyId = keyId + 1;
    return keyId;
}

function setClicker(key) {
    key.addEventListener('click', function() {
        alert(key.id);
    });
}

function getKeys() {
    const keys = document.getElementById('piano-div').querySelectorAll('div');
    keys.forEach(key => {
        key.id = setKeyId();
        setClicker(key);
    });
}
