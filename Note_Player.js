const audio = new Audio('./key.mp3');
let noteId = -1;
let notes = []
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
    let keys = []
    
    const pageKeys = document.getElementById('PianoKeys').querySelectorAll('button');

    for(var i = 0; i < pageKeys.length; i++) {
        const newSound = sound.cloneNode()
        newSound.preservesPitch = false;
        if(keys.length > 0){
            playbackRate = playbackRate - .1
        }
        newSound.playbackRate = playbackRate
        keys.push(newSound)
    }

    notes = keys

    pageKeys.forEach(key => {
        key.id = setNoteId();
        let id = key.getAttribute('id');
        key.addEventListener('click', function() {
            notes[key.id].play();

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
