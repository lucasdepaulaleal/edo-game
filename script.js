
// audio de fundo
const audio = document.getElementById('myAudio');
const playPauseButton = document.getElementById('playPauseButton');



function togglePlayPause() {
    const icone = document.getElementById('iconeSom');
    if (!audio.paused) {
        audio.pause();
        playPauseButton.textContent = 'Play music';
        icone.src = 'assets/audio-mutado.png';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause music';
        icone.src = 'assets/audio.png';
    }
}
