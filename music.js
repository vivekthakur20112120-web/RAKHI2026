// =====================================
// RAKSHA BANDHAN MUSIC PLAYER
// =====================================

const audioPlayer = document.getElementById("audioPlayer");
const currentSong = document.getElementById("currentSong");

const playButtons = document.querySelectorAll(".play-btn");

const stopBtn = document.getElementById("stopBtn");


// Play Song

playButtons.forEach(button => {

    button.addEventListener("click", () => {

        const song = button.dataset.song;

        audioPlayer.src = song;

        audioPlayer.play();

        currentSong.textContent =
        "🎶 Now Playing : " +
        button.parentElement.querySelector("h2").textContent;

    });

});


// Stop Button

stopBtn.addEventListener("click", () => {

    audioPlayer.pause();

    audioPlayer.currentTime = 0;

    currentSong.textContent =
    "🎶 No Song Selected";

});


// Song Finished

audioPlayer.addEventListener("ended", () => {

    currentSong.textContent =
    "🎶 Song Finished";

});