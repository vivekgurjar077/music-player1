let now_playing=document.querySelector(".now-playing");
let track_art=document.querySelector(".track-art");
let track_name=document.querySelector(".track-name");
let track_artist=document.querySelector(".track-artist");
let pre_btn=document.querySelector(".pre-track");
let playpause_btn=document.querySelector(".playpause-track");
let next_btn=document.querySelector(".next-track");
let curr_time=document.querySelector(".current-time");
let seek_slider=document.querySelector(".seek_slider");
let volume_slider=document.querySelector(".volume_slider");
let total_duration=document.querySelector(".total-duration");

let track_index=0;
let isplaying=false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list=[
    {
        name:"295",    
        artist:"arijit",
        image:"imge url",
        path:"music/295__Official_Audio____Sidhu_Moose_Wala___The_Kidd___Moosetape(128k).mp3",
    },
    {
        name:"7 rings",    
        artist:"arijit",
        image:"imge url",
        path:"music/Ariana_Grande_-_34+35_(official_video)(256k).mp3",
    },
    {
        name:"Really",    
        artist:"arijit",
        image:"imge url",
        path:"music/Charlie_Puth_-_We_Don't_Talk_Anymore_(feat._Selena_Gomez)_[Official_Video](256k).mp3",
    },
    {
        name:"i like me better",    
        artist:"arijit",
        image:"imge url",
        path:"music/Lauv_-_I_Like_Me_Better_[Official_Audio](256k).mp3",
    },
];




function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();

    curr_track.src=track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage='url('+track_list[track_index].image+ ')';
    track_name.textContent=track_list[track_index].name;
    track_artist.textContent=track_list[track_index].artist;
    now_playing.textContent="playing"+(track_index+1)+"of" +track_list.length;

    // update seek slider
    updateTimer=setInterval(seekUpdate,1000);

    //for next track
    curr_track.addEventListener("ended",nextTrack);

}
function resetValues(){
    curr_time.textContent="00:00";
    total_duration.textContent="00:00";
    seek_slider.value=0;
}

function playpauseTrack(){
    //switch between play and pause
    if(!isplaying){
        playTrack();
    }
    else pauseTrack();
}

function playTrack(){
    curr_track.play();
    isplaying=true;

    playpause_btn.innerHTML=`<i class="fa fa-pause-circle fa-5x"></i>`;
}
function pauseTrack(){
    curr_track.pause();
    isplaying=false;
    playpause_btn.innerHTML=`<i class="fa fa-play-circle fa-5x"></i>`;
    
}

function nextTrack(){
    if(track_index<track_list.length-1){
        track_index++;
    }
    else {
        track_index=0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index>0){
        track_index--;
    }
    else {
        track_index=track_list.length-1
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    seekTo=curr_track.duration*(seek_slider.value/100);
    curr_track.curr_time=seekTo;
}
function setVolume(){
    curr_track.volume=volume_slider.value/100;
}

function seekUpdate(){
    let seekPosition=0;

    //check if the current track duration is legible or not
    if(!isNaN(curr_track.duration)){
        seekPosition=curr_track.currentTime*(100/curr_track.duration);
        seek_slider.value=seekPosition;

        // cal the time and total duration
        let currentMinutes=Math.floor(curr_track.currentTime/60);
        let currentSeconds=Math.floor(curr_track.currentTime-currentMinutes*60);
        let durationMinutes=Math.floor(curr_track.duration/60);
        let durationSeconds=Math.floor(curr_track.duration-durationMinutes*60);

        //Add a zero to the single digit time value
        if(currentSeconds<10){
            currentSeconds="0"+currentSeconds;
        }
        if(durationSeconds<10){
            durationSeconds="0"+durationSeconds;
        }
        if(currentMinutes<10){
            currentMinutes="0"+currentMinutes;
        }
        if(durationMinutes<10){
            durationMinutes="0"+durationMinutes;
        }

        curr_time.textContent=currentMinutes+":"+currentSeconds;
        total_duration.textContent=durationMinutes+":"+durationSeconds;
    }
}
//load Track in the tracklist;
loadTrack(track_index);