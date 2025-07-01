/*

    let: Used to declare a Variable (which is a way to store information).

    function: Declare a function (which is a way to share common code, calculate things and keep your code clean).

*/

// Keeps track of what id things will be.
let keyId = -1;

// Set up soundbite
let audio = new Audio('./key.mp3');

// Keeps track of keys which are currently playing
let playedKeys = [];

// Gets the key functions in when the page loads
window.addEventListener('load', function() {
    getKeys(audio);
});

// Getting the keys from the html and looping through them
function getKeys(sound) {

    // This gets the keys from the html by finding the "piano-div", then getting all the divs (keys) underneath it.
    const keys = document.getElementById('piano-div').querySelectorAll('div');

    // Looping through the keys and setting their actions.
    keys.forEach(key => {
        key.id = setKeyId();
        setKeyAction(key, sound);
    });
}

// Keeping track of the variable "keyId", adding to it, and returning it.
function setKeyId() {
    keyId = keyId + 1;
    return keyId;
}

// Setting the action of the key it's given
function setKeyAction(key, sound) {
    key.addEventListener('click', function() {
        alert(key.id);
        const newSound = sound.cloneNode();
        playedKeys.push(newSound);
        newSound.play();
    });
}

// Finds any keys that are playing and stop them
function stop() {
    playedKeys.forEach(key => {
        key.pause();
        key.currentTime = 0;
    })
    playedKeys = []
}
