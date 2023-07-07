/*

    let: Used to declare a Variable (which is a way to store information).

    function: Declare a function (which is a way to share common code, calculate things and keep your code clean).

*/

// Keeps track of what id a key will be.
let keyId = -1;

// Configuration which lets us know how many octaves are involved, since we want to start lower the more octaves are included
let numberOfOctaves = 1;

// Set up soundbite
let audio = new Audio('./piano_key.mp3');

// Keeps track of keys which are currently playing
let playedKeys = [];

// Keeps track of the pitches for each key, by index
let keyPitches = [];

// Gets the key functions in when the page loads
window.addEventListener('load', function() {
    getKeys(audio);
})

// Getting the keys from the html and looping through them
function getKeys(sound) {

    // This gets the keys from the html by finding the "piano-div", then getting all the divs (keys) underneath it.
    const keys = document.getElementById('piano-div').querySelectorAll('div');

    // Set the pitches of each key
    setKeyPitches(keys.length);

    // Looping through the keys and setting their actions.
    keys.forEach(key => {
        key.id = setKeyId();
        setKeyAction(key, sound);
    });
}

// Setting the pitches of each key, using complicated math
function setKeyPitches(numberOfKeys) {
    for(let i = 0; i < numberOfKeys; i++) {
        keyPitches.push(2 ** ((i - Math.floor(numberOfOctaves / 2) * 12) / 12))
    }
}

// Keeping track of the variable "keyId", adding to it, and returning it.
function setKeyId() {
    keyId = keyId + 1;
    return keyId;
}

// Setting the action of the key it's given
function setKeyAction(key, sound) {
    key.addEventListener('click', function() {
        const newSound = sound.cloneNode();

        // Change the pitch (playbackRate) to our pitch defined in keyPitches
        newSound.preservesPitch = false;
        newSound.playbackRate = keyPitches[key.id]

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
