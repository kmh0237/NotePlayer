function setClicker(key) {
    key.addEventListener('click', () => {
        //
    } );
}

function getKeys(sound) {
    const keys = document.getElementById('PianoKeys').querySelectorAll('div');

    keys.forEach(key => {
        setClicker(key);
      });
}

function stop() {
    playedKeys.forEach(key => {
        key.pause();
        key.currentTime = 0;
    })
    playedKeys = []
}
