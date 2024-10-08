# About

This application is a music data generator that fetches data from various APIs and formats it according to the needs of the main application.

### APIs used:

- google custom search (I use this to scrape data from Discogs and Genius website)
- spotify
- genius

<br />

# How to use

## setup

First you need to have the access keys for the APIs and fill in a .env file following the .env.example model.

Get access keys from: [google](https://console.cloud.google.com/apis/credentials), [spotify](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) and [genius](https://docs.genius.com/#/getting-started-h1).

## Flow

The application will search for the first data of a track in the Spotify API and from this data it will do searches to extract data from the Dicogs website and the Genius website.

**IMPORTANT: The application may crash while searching for tracks, as APIs provide a maximum limit on calls (even if it fails, none of the data already searched will be lost).**

## run

install the dependencies

```bash
npm i
```

run this command to search for new tracks (I'm looking for tracks with a minimum popularity of 75 according to spotify data, but you can change this within the code).

The command first checks if the track already exists before fetching data from other APIs.

```bash
npm run create-data
```

or search according to the genres you want (up to 5) see [available genres](https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres) for reference (the default is "hip-hop,electronic")

```bash
node createDb.js --genres=eletronic,hip-hop
```

make sure you don't add spaces between the commas:

X node createDb.js --genres="eletronic, hip-hop" X

You can also use the limit flag to define the number of tracks you want to search (the default and maximum is 100).

```bash
node createDb.js --limit=10
```

<hr/>
<br/>

Another command is to fill the albums. Its usefulness is to search for the remaining data regarding the album of a track, since when the create-data command is activated it searches for the song and creates the album, but does not fill it with the rest of the songs that exist in it.

The command first checks if the track already exists before fetching data from other APIs.

```bash
npm run fill-albums
```

You can specify an index to speed up the process and avoid checking for tracks in an album that you already know is fulfilled.

```bash
node fillAlbums.js --index=10
```

<hr/>
<br/>

The last command is to create a data structure that will be used in the search microservice

```bash
npm run create-documents
# or
node createElasticDocs.js
```
