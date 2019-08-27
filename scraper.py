#USE PYTHON 3

from bs4 import BeautifulSoup
import requests
import os
import re

songList = ["https://genius.com/Frank-ocean-at-your-best-you-are-love-lyrics",
"https://genius.com/Frank-ocean-alabama-lyrics",
"https://genius.com/Frank-ocean-mine-lyrics",
"https://genius.com/Frank-ocean-unity-lyrics",
"https://genius.com/Frank-ocean-a-certain-way-lyrics",
"https://genius.com/Frank-ocean-comme-des-garcons-lyrics",
"https://genius.com/Frank-ocean-xenons-lyrics",
"https://genius.com/Frank-ocean-honeybaby-lyrics",
"https://genius.com/Frank-ocean-wither-lyrics",
"https://genius.com/Frank-ocean-hublots-lyrics",
"https://genius.com/Frank-ocean-in-here-somewhere-lyrics",
"https://genius.com/Frank-ocean-slide-on-me-lyrics",
"https://genius.com/Frank-ocean-sideways-lyrics",
"https://genius.com/Frank-ocean-florida-lyrics",
"https://genius.com/Frank-ocean-impietas-deathwish-asr-lyrics",
"https://genius.com/Frank-ocean-rushes-lyrics",
"https://genius.com/Frank-ocean-higgs-lyrics",
"https://genius.com/Frank-ocean-mitsubishi-sony-lyrics"
]

#uses regular expression to get the song name in the middle of the URL string
def getSongName(song):
    songString = song
    result = re.search("https://genius.com/Frank-ocean-(.*)-lyrics", songString)
    return result.group(1)


for song in songList:
    URL = song
    page = requests.get(URL)
    #Extract the page's HTML as a string 
    html = BeautifulSoup(page.text, "html.parser")
    # Scrape the song lyrics from the HTML
    lyrics = html.find("div", class_="lyrics").get_text()
    lyrics = os.linesep.join([s for s in lyrics.splitlines() if s])
    songName = getSongName(song)
    text_file = open(songName + ".txt", "w")
    text_file.write(lyrics)
    text_file.close()


