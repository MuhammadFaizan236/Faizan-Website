console.log("Welcome to Spotify");
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Another Love", filePath: "Audio File(1).mp3", coverPath: "cover1.jpg" },
    { songName: "Tujhe Bhula Diya", filePath: "Tujhe Bhula Diya-Kabir Bhakka.mp3", coverPath: "cover2.jpg" },
    { songName: "Hasrate Baar Baar", filePath: "Audio File.mp3", coverPath: "cover3.jpg" },
    { songName: "Dil", filePath: "Maine Tera Naam Dil Rakh Diya [Slowed+Reverb]-𝚇𝚑𝚘𝚗𝚎𝚢.mp3", coverPath: "cover4.jpg" },
    { songName: "Aaja We Mahiya", filePath: "𝘐𝘮𝘳𝘢𝘯 𝘒𝘩𝘢𝘯 - 𝘈𝘢𝘫𝘢 𝘷𝘦 𝘮𝘢𝘩𝘪𝘺𝘢 (𝘚𝘭𝘰𝘸𝘦𝘥+ 𝘳𝘦𝘷𝘦𝘳𝘣𝘦𝘥)💙💭-SHREYANSH SHUKLA.mp3", coverPath: "cover5.jpg" },
    { songName: "Bewafa", filePath: "Imran khan - Bewafa (Official Music Video)-imrankhanworld.mp3", coverPath: "cover6.jpg" },
    { songName: "Beety Lamhein", filePath: "Beete Lamhein Lyrics  KK  The Train  Mithoon  Sayeed Qadri  Emraan Hashmi -Superhit Music.mp3", coverPath: "cover7.jpg" },
    { songName: "Bhula Dena", filePath: "Bhula Dena - Lofi (Slowed + Reverb) _ Aashiqui 2 _ Mustafa Zahid _ SR Lofi.mp3", coverPath: "cover8.jpg" }
];

// Update song items
songItems.forEach((element, i) => {
    let img = element.getElementsByTagName("img")[0];
    let songName = element.getElementsByClassName("songName")[0];
    img.src = songs[i].coverPath;
    songName.innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to audio timeupdate event
audioElement.addEventListener('timeupdate', () => {
    // Update SeekBar
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
    // Update cover progress bar and play icon
    let coverProgress = (audioElement.currentTime / audioElement.duration) * 100;
    let coverIcon = songItems[songIndex].querySelector('.songItemPlay');
    songItems[songIndex].style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.2) ${coverProgress}%, transparent ${coverProgress}%)`;
    coverIcon.style.opacity = 1;
});

// Handle SeekBar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Function to reset all play icons
const resetPlayIcons = () => {
    songItems.forEach((element) => {
        let playIcon = element.querySelector('.songItemPlay');
        playIcon.classList.remove('fa-circle-pause');
        playIcon.classList.add('fa-circle-play');
    });
};

// Play/pause a song when a song item is clicked
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        resetPlayIcons();
        let playIcon = element.querySelector('.songItemPlay');
        playIcon.classList.remove('fa-circle-play');
        playIcon.classList.add('fa-circle-pause');
        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songIndex = index;
        // Update song title and cover play icon here
        masterSongName.innerText = songs[songIndex].songName;
        let coverIcon = element.querySelector('.songItemPlay');
        coverIcon.classList.remove('fa-circle-play');
        coverIcon.classList.add('fa-circle-pause');
    });
});

// Previous Button
let previousButton = document.querySelector('.fa-backward-step');
previousButton.addEventListener('click', () => {
    songIndex--; // Decrement song index to play the previous song
    if (songIndex < 0) {
        songIndex = songs.length - 1; // If at the beginning, loop to the last song
    }
    playSong();
});

// Forward Button
let forwardButton = document.querySelector('.fa-forward-step');
forwardButton.addEventListener('click', () => {
    songIndex++; // Increment song index to play the next song
    if (songIndex >= songs.length) {
        songIndex = 0; // If at the end, loop to the first song
    }
    playSong();
});

// Function to play the selected song
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    // Update the song title or do other necessary updates
    masterSongName.innerText = songs[songIndex].songName;
    let coverIcon = songItems[songIndex].querySelector('.songItemPlay');
    coverIcon.classList.remove('fa-circle-play');
    coverIcon.classList.add('fa-circle-pause');
    songItems[songIndex].style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, transparent 0%)`;
}
// new


// Play/pause a song when a song item is clicked
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        resetPlayIcons();
        let playIcon = element.querySelector('.songItemPlay');
        playIcon.classList.remove('fa-circle-play');
        playIcon.classList.add('fa-circle-pause');
        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songIndex = index;
        // Update song title and cover play icon here
        masterSongName.innerText = songs[songIndex].songName;
        let coverIcon = element.querySelector('.songItemPlay');
        coverIcon.classList.remove('fa-circle-play');
        coverIcon.classList.add('fa-circle-pause');
    });
});










