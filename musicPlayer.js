const songs = [
    {id: 1, title: "Memory Reboot", artist: "John Legend", genre: "Pop", music: "music/Memory-Reboot.mp3", image: "images/Memory_reboot.jpg"},
    {id: 2, title: "Brown Munde", artist: "Luis Fonsi", genre: "Pop", music: "music/Brown-Munde.mp3", image: "images/Brown_munde.jpg" },
    {id: 3, title: "Insane", artist: "Adele", genre: "Pop", music: "music/Insane.mp3", image: "images/Insane.jpeg" },
    {id: 4, title: "Sajni", artist: "Michael Jackson", genre: "Pop", music: "music/Sajni-Re.mp3", image: "images/sajni.jpg"},
    {id: 5, title: "King Shit", artist: "Queen", genre: "Rock", music: "music/King-Shit.mp3", image: "images/King_shit.jpg"},
    {id: 6, title: "O Maahi", artist: "Led Zeppelin", genre: "Rock", music: "music/O-Maahi.mp3", image: "images/O_Maahi.jpeg"},
    {id: 7, title: "Akhiyaan Gulaab", artist: "Guns N' Roses", genre: "Rock", music: "music/Akhiyaan.mp3", image: "images/Akhiyaan.jpeg"},
    {id: 8, title: "Waalian", artist: "Nirvana", genre: "Rock", music: "music/Waalian.mp3", image: "images/Waalian.jpg"},
    {id: 9, title: "Hua Main", artist: "Eagles", genre: "Rock", music: "music/Hua-Main.mp3", image: "images/Hua_main.jpg"},
    {id: 10, title: "Kalaastar", artist: "Against Me!", genre: "Punk", music: "music/Kalaastar.mp3", image: "images/Kalaastar.jpg"},
    {id: 11, title: "One Love", artist: "The Clash", genre: "Punk", music: "music/One-Love.mp3", image: "images/One_love.jpg"}
];


function songElementAppendOnList(song) {
    const songsList = document.getElementById("songs");
    const songElement = document.createElement('div');
    songElement.innerHTML = `<div class="user">
                                <img src="images/list.png" style="height: 20px; width: 20px; margin-right: 20px; border-radius: 50%" alt=""
                                <p>${song.title}</p>
                                <button class="play-btn">Play</button>
                            </div>`;
    songsList.appendChild(songElement);
    songElement.addEventListener('click', () => {
        renderCurrentSong(song);
    })
}

function renderCurrentSong(song) {
    const songCard = document.getElementById("music-card");
    const songCardElement = document.createElement('div');
    songCardElement.innerHTML = `<div class="inner-div-1">
                                    <img src=${song.image} style="height: 250px; width: 250px; border-radius: 50%" alt="">
                                    <h3>${song.title}</h3>
                                    <h4>${song.artist}</h4>
                                    <audio controls style="width: 300px; padding-top: 8px;">
                                        <source src=${song.music} type="audio/mp3">
                                    </audio><br>
                                    <div class="card-buttons">
                                        <div class="prev-next">
                                            <button id="prev-btn">prev</button>
                                            <button id="next-btn">next</button>
                                        </div>
                                        <button id="addToPlaylist">Add to Playlist</button>
                                    </div>
                                </div>`;
    if (songCardElement) {
        songCard.innerHTML = "";
    }
    songCard.appendChild(songCardElement);
    renderButtons();

    // playlist
    const addBtn = document.getElementById("addToPlaylist");
    addBtn.addEventListener('click', () => {
        addToPlaylist(song);
        addBtn.disabled = true;
    })
}

function renderButtons(){
    // buttons
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let currentIndex = 0;

    function playNextSong() {
        currentIndex = (currentIndex + 1) % songs.length;
        renderCurrentSong(songs[currentIndex]);
    }

    function playPreviousSong() {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        renderCurrentSong(songs[currentIndex]);
    }

    nextBtn.addEventListener('click', playNextSong);
    prevBtn.addEventListener('click', playPreviousSong);
}

// add to playlist
function addToPlaylist(song) {
    const currentPlaylist = document.getElementById("current-playlist");
    const songPlaylistElement = document.createElement('div');
        songPlaylistElement.innerHTML = `<div id="song-name">${song.title}</div>`;
        currentPlaylist.appendChild(songPlaylistElement);
}

// New-playlist
const createBtn  =document.getElementById("btn");
createBtn
.addEventListener('click', () => {
    const InputPlaylist = document.getElementById("input-playlist");
    const inputValue = document.createElement('div');
    inputValue.innerHTML = `<div id="new-play">
                                <h4 id="heading">${InputPlaylist.value}</h4>
                            </div>`;
    const newPlaylist = document.getElementById("new-playlist");
    newPlaylist.appendChild(inputValue);
})


// Songs filtering based on genre
function showSongs(songs, selectedValue) {
    const songsList = document.getElementById("songs");
    // For selected songs
    const songsname = songs.filter((song) => song.genre === selectedValue);  
    if (songsname) {
        songsList.innerHTML = "";   //making the list empty everytime we select different genre.
        songsname.forEach(song => {     //iterating over each element of filtered songs array list.
            // create new div
            songElementAppendOnList(song);
        })
    }
    // For all songs
    if (selectedValue === "all-songs") {
        songs.forEach(song => {
            songElementAppendOnList(song);
        })
    }
}
const songsGenre = document.getElementById("filter-btn");
songsGenre.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    // Filter Songs based on genre
    showSongs(songs,selectedValue);
})



// Dark Mode
const darkBtn = document.getElementById("toggle-btn");
const outerContainer = document.querySelector(".outer-container");
const headerLogo = document.querySelector(".logo");

const firstContainers = document.querySelector(".darkTheme");
const secondContainers = document.querySelector(".darkTheme-1");
const thirdContainers = document.querySelector(".darkTheme-2");

function toggleTheme() {
    outerContainer.classList.toggle('dark-mode');
    headerLogo.classList.toggle('dark-logo');
    firstContainers.classList.toggle('dark');
    secondContainers.classList.toggle('dark');
    thirdContainers.classList.toggle('dark');
}

darkBtn.addEventListener('change', () => {
    if (darkBtn.checked) {
        toggleTheme();
    }else{
        toggleTheme();
    }
});


// Default
// Default loading all songs at once
songs.forEach(song => {
    songElementAppendOnList(song);
})
// Default loading of Song-card
renderCurrentSong(songs[1]);