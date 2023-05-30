const audio = new Audio('./key3.mp3');
let notes = []
const playedNotes = []

window.addEventListener('load', function() {
    getKeys(audio)
})

function getKeys(sound) {
    let playbackRate = 1;
    let keys = []
    
    const keyCount = document.getElementById('PianoKeys').getElementsByTagName('button').length;

    for(var i = 0; i < keyCount; i++) {
        const newSound = sound.cloneNode()
        newSound.preservesPitch = false;
        if(keys.length > 0){
            playbackRate = playbackRate - .1
        }
        newSound.playbackRate = playbackRate
        keys.push(newSound)
    }

    notes = keys
}

function play(key) {
    playedNotes.push(notes[key])

    playedNotes.forEach((key) =>  key.play())
}

function stop() {
    playedNotes.forEach(key => {
        key.pause();
        key.currentTime = 0;
    })
    playedNotes = []
}
