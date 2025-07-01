/*

    let: Used to declare a Variable (which is a way to store information).

    function: Declare a function (which is a way to share common code, calculate things and keep your code clean).

*/

// Keeps track of what id a key will be.
let keyId = -1;

// Configuration which lets us know how many octaves are involved, since we want to start lower the more octaves are included
let numberOfOctaves = 2;

// Set up soundbite
let audio = new Audio('./key.mp3');

// Keeps track of keys which are currently playing
let playedKeys = [];

// Keeps track of the pitches for each key, by index
let keyPitches = [];

// Gets the key functions in when the page loads
window.addEventListener('load', function() {
    getKeys();
});

// Getting the keys from the html and looping through them
function getKeys() {

    // This gets the keys from the html by finding the "piano-div", then getting all the divs (keys) underneath it.
    let keys = document.getElementById('piano-div').querySelectorAll('div');

    // Set the pitches of each key
    setKeyPitches(keys.length);

    // Looping through the keys and setting their actions.
    keys.forEach(key => {
        key.id = setKeyId();
        setKeyAction(key);
    });
}

// Setting the pitches of each key, using complicated math
function setKeyPitches(numberOfKeys) {
    for(let i = 0; i < numberOfKeys; i++) {
        keyPitches.push(2 ** ((i - Math.floor(numberOfOctaves / 2) * 12) / 12));
    }
}

// Keeping track of the variable "keyId", adding to it, and returning it.
function setKeyId() {
    keyId = keyId + 1;
    return keyId;
}

// Setting the action of the key it's given
function setKeyAction(key) {
    key.addEventListener('click', async function() {
        // lookup key in wikipedia
        let keyStringLookup = ['C', 'C-sharp', 'D', 'E-flat', 'E', 'F', 'F-sharp', 'G', 'A-flat', 'A', 'B-flat', 'B'];
        let keyString = keyStringLookup[key.id % 12];
        
        let categoryResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Compositions_in_${keyString}_major&prop=categories&cllimit=max&gcmlimit=max&origin=*&format=json`);
        let categoryData = await categoryResponse.json();

        let pages = Object.keys(categoryData.query.pages);
        let randomPageId = categoryData.query.pages[pages[Math.floor(Math.random()*pages.length)]].pageid;

        let pageResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${randomPageId}&inprop=url&origin=*&format=json`);
        let pageData = await pageResponse.json();

        let div = document.createElement('div');
        div.setAttribute('style', 'color:white;margin-top:10px;');
        const link = document.createElement('a');
        link.setAttribute('href', pageData.query.pages[randomPageId].fullurl);
        link.setAttribute('target', '_blank');
        link.textContent = 'link txt';
        div.innerText = `There was a song written in this key! It's called ${pageData.query.pages[randomPageId].title}. Check it out here: `;
        div.appendChild(link);
        document.getElementById('piano-div').after(div);

        let newSound = audio.cloneNode();

        // Change the pitch (playbackRate) to our pitch defined in keyPitches
        newSound.preservesPitch = false;
        newSound.playbackRate = keyPitches[key.id];

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
