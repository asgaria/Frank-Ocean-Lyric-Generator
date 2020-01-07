
var background_list = [
  "https://media0.giphy.com/media/gIpoeYNMCpDeE/giphy.gif",
  "https://media2.giphy.com/media/OCs69ZSSC4yoE/giphy.gif",
  "https://media1.giphy.com/media/Lytug8xU6Ae5i/giphy.gif",
  "https://media3.giphy.com/media/gn3ZzZZ1jwps4/giphy.gif",
  "https://media1.giphy.com/media/jCmVGeJu7tN4Y/giphy.gif",
  "https://media1.giphy.com/media/hl0Kk1UNmRfQk/giphy.gif",
  "https://media.giphy.com/media/Dk3ZN2jgww0Gk/giphy.gif",
  "https://media.giphy.com/media/wpZY5yxRZ0zkI/giphy.gif",
  "https://media.giphy.com/media/n8aCbpi0Ny7wA/giphy.gif",
  "https://media.giphy.com/media/YXzaivCzURdOU/giphy.gif",
  "https://media.giphy.com/media/cZepKV9Dgqmre/giphy.gif",
  "https://media.giphy.com/media/S7RDeGKVrGzzW/giphy.gif",
  "https://media.giphy.com/media/FxRpscZhTpQyI/giphy.gif",
  "https://media.giphy.com/media/r0Hmyx9xQA4WA/giphy.gif"
]

var endlessTracklist =
["A certain way",
 "In here somewhere",
  "Alabama",
  "Mine",
  "At your best you are love",
  "Mitsubishi sony",
  "Comme des garcons",
  "Rushes",
  "Sideways",
  "Higgs",
  "Slide on me",
  "Honeybaby",
  "Unity",
  "Hublots",
  "Wither",
  "Impietas deathwish asr",	
  "Xenons"]
  
var nostalgiaUltraTracklist = 
[
"Strawberry%20Swing",
"Novacane",
"We%20All%20Try",
"Songs%20For%20Women",
"Lovecrimes",
"There%20Will%20Be%20Tears",
"Swim%20Good",
"Dust",
"American%20Wedding",
"Nature%20Feels"
]

var channelOrangeTracklist = 
[
  "Thinkin%20Bout%20You",
  "Fertilizer",
  "Sierra%20Leone",
  "Sweet%20Life",
  "Not%20Just%20Money",
  "Super%20Rich%20Kids",
  "Pilot%20Jones",
  "Crack%20Rock",
  "Pyramids",
  "Lost",
  "Monks",
  "Bad%20Religion",
  "Forrest%20Gump",
]

var blondeTracklist = 
[
  "Nikes",
  "Ivy",
  "Be%20Yourself",
  "Solo",
  "Skyline%20To",
  "Self%20Control",
  "Good%20Guy",
  "Nights",
  "Pretty%20Sweet",
  "Facebook%20Story",
  "Close%20To%20You",
  "White%20Ferrari",
  "Seigfried",
  "Godspeed",
  "Futura%20Free"
]

function changeBg(){
  random_bg = Math.floor((Math.random() * background_list.length));
  document.getElementById('bg').style.backgroundImage = background_list[random_bg];
}

window.onload = function() {
  changeBg();
}

function recolor(album){
  document.getElementById('nostalgiaUltra').style.borderColor = "#78FFCD";
  document.getElementById('channelOrange').style.borderColor = "#78FFCD";
  document.getElementById('blonde').style.borderColor = "#78FFCD";
  document.getElementById('endless').style.borderColor = "#78FFCD";

  document.getElementById(album).style.borderColor = "#F5F5F5";
}

function chooseLine(lyricsList)
{
  size = lyricsList.length - 1;
  randIndex = (Math.floor(Math.random() * size));
  newline = lyricsList[randIndex];
  
  if(newline.includes("[") || newline === undefined || newline === null || newline === "" || newline === NaN)
  {
    newline = chooseLine(lyricsList);
  }

  return newline; 
}

function displayLyric(line, songName, artist)
{
  random_bg = Math.floor((Math.random() * background_list.length));

  formattedLine = "\"" + line + "\"";
  console.log("Display Line" + line);
  document.getElementById('displayLyric').innerHTML = line;
  document.getElementById('displaySong').innerHTML = songName;
  document.getElementById('displayArtist').innerHTML = artist;
  document.getElementById("bg").style.backgroundImage = 'url('+(background_list[random_bg])+')';
  
  var tweet_button = document.createElement("BUTTON");
  tweet_button.Id = "tweet_button";
  var tweet_text = document.createTextNode("Click to Subtweet");
  tweet_button.appendChild(tweet_text);
  tweet_button.className = "tweet";

  var tweet_area = document.getElementById('tweet_button_spot');
  tweet_area.removeChild(tweet_area.firstChild);
  document.getElementById('tweet_button_spot').appendChild(tweet_button);
  document.getElementById('tweet_button_spot').onclick = function () {
    window.open("https://twitter.com/intent/tweet?text=" + document.getElementById('displayLyric').innerHTML);
  }
}
function logLyric(song){
  v = song;
  console.log("hello");

  $.ajax({
    url: "https://orion.apiseeds.com/api/music/lyric/Frank%20Ocean/" + v + KEY,
    cache: false,
    success: function(result){
      console.log(result)
      //console.log(result.result.artist);
      console.log(result.result.track.name);
      console.log(result.result.track.text);
      artist = "Frank Ocean";
      songName = result.result.track.name;
      lyrics = result.result.track.text;
      lyricsList = lyrics.split("\n");
      line = chooseLine(lyricsList);
      console.log("success line:" + line);
      displayLyric(line, songName, artist);
    }
  });

  return;
}

function getSong(album)
{
  var rand, song;

  if(album == "nostalgiaUltra")
  {
    rand = Math.floor((Math.random() * nostalgiaUltraTracklist.length));
    song = nostalgiaUltraTracklist[rand];
  }

  else if(album == "channelOrange")
  {
    rand = Math.floor((Math.random() * channelOrangeTracklist.length));
    song = channelOrangeTracklist[rand];
  }

  else if(album == "blonde")
  {
    rand = Math.floor((Math.random() * blondeTracklist.length));
    song = blondeTracklist[rand];
  }

  else if (album == "endless")
  {
    rand = Math.floor((Math.random() * endlessTracklist.length));
    song = endlessTracklist[rand];
  }

  return song; 
}


function writeLyric(album){
  recolor(album);
  song = getSong(album);
  logLyric(song);
  return;
}




function getEndlessSongLine()
{
  var songArray = [aCertainWay, inHereSomewhere, alabama, mine, atYourBest, mitsubishi, commeDesGarcon, rushes, sideways, higgs, slide, honeybaby, unity, hublots, wither, impietas, xenons];
  size = endlessTracklist.length - 1;
  randIndex = (Math.floor(Math.random() * size));
  randSongName = endlessTracklist[randIndex];
  randSongLyricArray = songArray[randIndex];
  randSongLyricArray = randSongLyricArray.split("\n");
  randLine = chooseLine(randSongLyricArray);
  displayLyric(randLine, randSongName, "Frank Ocean");

}

function writeEndlessLyric(){
  recolor("endless");
  getEndlessSongLine();
}
