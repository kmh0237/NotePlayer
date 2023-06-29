let keyId = -1;

console.log("init")
window.addEventListener('load', function() {
    console.log("load")
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
    const keys = document.getElementById('PianoKeys').querySelectorAll('div');
    console.log(keys)
    keys.forEach(key => {
        key.id = setKeyId();
        setClicker(key);
    });
}
