const audio = new Audio('./piano_key.mp3');
let noteId = -1;
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
    let playbackRate = 1;
    
    const pageKeys = document.getElementById('PianoKeys').querySelectorAll('div');
    console.log(pageKeys)

    for(var i = 0; i < pageKeys.length; i++) {
        if(keys.length > 0){
            playbackRate = playbackRate - .1
        }
        keys.push(playbackRate)
    }

    pageKeys.forEach(key => {
        console.log(key)
        key.id = setNoteId();
        key.addEventListener('click', function() {
            const newSound = sound.cloneNode();
            newSound.preservesPitch = false;
            newSound.playbackRate = keys[key.id]
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
