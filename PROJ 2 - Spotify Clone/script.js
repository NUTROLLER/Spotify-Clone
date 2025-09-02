console.log(`Javascript has been loaded!`);

let currentSong = new Audio();
let songs;
let highlightCurrentSong;
console.log("The current song is" + currentSong)
async function getSongs() {
    let a = await fetch("/songs/");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let songs = div.getElementsByTagName("a");
    let songList = []
    // console.log(songs);
    for (let index = 0; index < songs.length; index++) {
        const element = songs[index];
        if (element.href.endsWith(".mp3")) {
            songList.push(element.href.split("/songs/")[1])
        }

    }
    return songList;
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
    if (!pause) {
        currentSong.play();
        play.src = "svg/pause.svg";
    }
    console.log(currentSong);
    highlightCurrentSong =  currentSong.src.toString().split("/")[4];
    
    
    songName = track.trim().replaceAll(".mp3", "").replaceAll("by", " — ").replaceAll("-", " ")
    document.querySelector(".songInfo").innerHTML = songName;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function main() {


    //Get list of all songs
    songs = await getSongs();
    console.log(songs);
    playMusic(songs[0], true)
    // show all the songs in the playlist
    let songUL = document.querySelector(".SONG").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><div class="info" id="${song}"style="display: flex;"><img src="svg/music.svg" alt="music"><div>${song.replaceAll("-", " ").replaceAll(".mp3", " ").replaceAll("by", " - ")} <!-- ${song} --></div></div><img src="svg/play-card.svg" title="Play ${song.replaceAll("-", " ").replaceAll(".mp3", " ").replaceAll("by", " - ")}" alt="play"></li>`;
    }

    //Attach an event listener to all li items so that when someone clicks, it plays.
    Array.from(document.querySelector(".SONG").getElementsByTagName("li")).forEach((e) => {
        console.log(e);
        e.addEventListener("click", () => {
            //    let f = e.querySelector(".info").childNodes[1].childNodes[1].textContent;
            //    console.log(f);
            playMusic(e.querySelector(".info").childNodes[1].childNodes[1].textContent.trim());
        })
    })
    //attach an event listener to play, next and previous svg images. 
    document.getElementById("play").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "svg/pause.svg"; //can reference element ids directly lol
        }
        else {
            currentSong.pause()
            play.src = "svg/playsong.svg";
        }
    })
    //chatgpt se liya hua mm:ss convert krne wala function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Pad single digit seconds with a leading zero
        const paddedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

        return minutes + ':' + paddedSeconds;
    }
    //MAking the seekbar work: Listen for time update event (time update ho  rha hai song ka)
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(Math.floor(currentSong.currentTime))}` + "/" + `${formatTime(Math.floor(currentSong.duration))}`
        document.querySelector(".seekerhead").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
        document.querySelector(".trail").style.width = ((currentSong.currentTime + 1) / (currentSong.duration)) * 100 + "%";
    })

    //add event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".seekerhead").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
}
main();

//hamburger menu functionality
document.getElementById("ham-menu").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px";
    document.querySelector(".right").style.filter = "blur(5px)"
    document.querySelector(".playbar").style.filter = "blur(5px)"
})
document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100vw";
    document.querySelector(".right").style.filter = "blur(0px)"
    document.querySelector(".playbar").style.filter = "blur(0px)"
})

//home button functionality:
document.getElementById("home").addEventListener("click", () => {
    window.location.href = "./index.html"
})

//removing right click facility:
// document.body.addEventListener("contextmenu", (e)=>{
//     e.preventDefault(); //this disables right click
// })

// Adding previous and next functionality:
previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if (index - 1 >= 0) {
        playMusic(songs[index - 1])
    }

})
next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if (index + 1 < songs.length) {
        playMusic(songs[index + 1])
        console.log("This is index: " + index)
    }
})
