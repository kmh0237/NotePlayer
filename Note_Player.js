const audio = new Audio('./key.mp3');
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
    
    const pageKeys = document.getElementById('PianoKeys').querySelectorAll('button');

    for(var i = 0; i < pageKeys.length; i++) {
        if(keys.length > 0){
            playbackRate = playbackRate - .1
        }
        keys.push(playbackRate)
    }

    pageKeys.forEach(key => {
        key.id = setNoteId();
        key.addEventListener('click', function() {
            const newSound = sound.cloneNode();
            newSound.preservesPitch = false;
            newSound.playbackRate = keys[key.id]
            newSound.play();
        } );
      });
}

// function play(id) {

//     notes[id].play()

//     // playedNotes.push(notes[id])

//     // playedNotes.forEach((key) =>  key.play())
//    // key.play()
// }

function stop() {
    playedNotes.forEach(key => {
        key.pause();
        key.currentTime = 0;
    })
    playedNotes = []
}
