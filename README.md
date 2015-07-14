# README

## Overview
React was used to structure the application as a SWA. jQuery was used in some places
 for simplicity.

## Usage
```
npm install
gulp build
open build/index.html
```

### Header
 - where searching is done, using form

### List
 - list from spotify matching artist query from header submit

### Artist
 - details on artist clicked from list
 - contains back button to search again

## Improvements
 - remove uneeded gulp processes from boilerplate
 - search could be left alone when hitting back button
 - paging through search term data
 - url routing to be designed

## Spotify API Request Examples

## Search Artists
https://developer.spotify.com/web-api/search-item/
### Example
```
$ curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist"
```

## Top Tracks
https://developer.spotify.com/web-api/get-artists-top-tracks/
### Example
```
$ curl -X "GET https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE"
```

