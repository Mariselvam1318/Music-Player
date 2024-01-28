const playButton = document.getElementById('play-button');
const songs=document.getElementById('songs');
const progressInput = document.querySelector('.song-slider');
const volumeInput = document.querySelector('.volume');
const nextButton = document.getElementById('next');
const preButton = document.getElementById('pre');
const songUrls = [
'Kannazhaga---The-Kiss-Of-Love-Shruti-Haasan-Dhanush.mp3',
'Suthudhe-Suthudhe-Yuvan-Shankar-Raja.mp3',
'Naruchiriyude Minnayam.mp3',

];

let currentSongIndex = 0;
let audio = new Audio(songUrls[currentSongIndex]); 
let isPlaying = false;

function playNextSong() {
  progressInput.value = 0;
  currentSongIndex = (currentSongIndex + 1) % songUrls.length;
  audio.src = songUrls[currentSongIndex];
  audio.play();
  
}
function playpreSong() {
progressInput.value = 0;
currentSongIndex = (currentSongIndex - 1) % songUrls.length;
audio.src = songUrls[currentSongIndex];
audio.play();

}
function updateSongSlider() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const percentage = (currentTime / duration) * 100;
  progressInput.value = percentage;
}


function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i  id="icon" class="fa-solid fa-play fa-lg" style="color: #000000;"></i>';
    } else {
      songs.style.display="block";
      progressInput.addEventListener('input', () => {
        const progress = parseFloat(progressInput.value);
        const currentTime = (progress / 100) * audio.duration;
        audio.currentTime = currentTime;
    });
    volumeInput.addEventListener('input', () => {
      audio.volume = parseFloat(volumeInput.value);
  });
      audio.play();
      playButton.innerHTML = '<i id="icon" class="fa-solid fa-pause fa-lg" style="color: #000000;"></i>';
    }
    isPlaying = !isPlaying;
}
audio.addEventListener('ended', () => {
  playNextSong();
});

playButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextSong);
preButton.addEventListener('click', playpreSong);
audio.addEventListener('timeupdate', updateSongSlider);