const audio = new Audio('./key.mp3');
let keyRates = []

let keyId = -1;
const numberOfOctaves = 2;

const playedKeys = []

window.addEventListener('load', function() {
    getKeys(audio)
})

function setKeyId() {
    keyId = keyId + 1;

    return keyId;
}

function getRates(numberOfKeys) {
    for(var i = 0; i < numberOfKeys; i++) {
        keyRates.push(2 ** ((i - Math.floor(numberOfOctaves / 2) * 12) / 12))
    }
}

function setClicker(key, sound) {
    key.addEventListener('click', function() {
        const newSound = sound.cloneNode();
        newSound.preservesPitch = false;
        newSound.playbackRate = keyRates[key.id]
        playedKeys.push(newSound);
        newSound.play();
    } );
}

function getKeys(sound) {
    const keys = document.getElementById('PianoKeys').querySelectorAll('div');

    getRates(keys.length)

    keys.forEach(key => {
        key.id = setKeyId();
        setClicker(key, sound);
      });
}

function stop() {
    playedKeys.forEach(key => {
        key.pause();
        key.currentTime = 0;
    })
    playedKeys = []
}
