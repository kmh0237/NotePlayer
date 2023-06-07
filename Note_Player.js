const audio = new Audio('./piano_key.mp3');
let noteId = -1;
const numberOfOctaves = 2;
let keys = []
const playedNotes = []

window.addEventListener('load', function() {
    getKeys(audio)
})

function setNoteId() {
    noteId = noteId + 1;

    return noteId;
}

function getKeys(sound) {
    const pageKeys = document.getElementById('PianoKeys').querySelectorAll('div');

    for(var i = 0; i < pageKeys.length; i++) {
        keys.push(2 ** ((i - Math.floor(numberOfOctaves / 2) * 12) / 12))
    }

    pageKeys.forEach(pageKey => {
        pageKey.id = setNoteId();
        pageKey.addEventListener('click', function() {
            const newSound = sound.cloneNode();
            newSound.preservesPitch = false;
            newSound.playbackRate = keys[pageKey.id]
            newSound.play();
        } );
      });
}

function stop() {
    playedNotes.forEach(key => {
        key.pause();
        key.currentTime = 0;
    })
    playedNotes = []
}
