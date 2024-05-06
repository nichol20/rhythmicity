"use client"
import Image from 'next/image'
import styles from '../../../styles/Album.module.scss'
import { TrackList, TrackRow } from '@/components/TrackList'
import { msToMinutes } from '@/utils/conversion'
import { usePlayback } from '@/contexts/PlaybackContext'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'

interface AlbumPageProps {
    params: {
        id: string
    }
}

const album = {
    "id": "7e3d57fe-569f-4195-a32d-c8b4b09b6986",
    "name": "Rather Be (feat. Jess Glynne)",
    "artistIds": [
        "b8def1d2-10e8-4985-b199-61d7a12503e5",
        "7d9e2e2f-a095-4afb-92ea-ed4e51c7bb0b"
    ],
    "trackIds": ["3f0e0bf9-6ee8-4dc6-9c33-8a14b8a34073"],
    "genres": ["Electronic"],
    "styles": ["House", "Deep House", "Downtempo"],
    "spotify": {
        "id": "4UB0J5V3JsZZtNR360pZ6r",
        "popularity": 67,
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2737e519297d9876b6afff2ab7b",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e027e519297d9876b6afff2ab7b",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048517e519297d9876b6afff2ab7b",
                "width": 64
            }
        ],
        "releaseDate": "2014-01-17"
    },
    "type": "album",
    "totalTracks": 1
}

const tracks = [{
    "id": "3f0e0bf9-6ee8-4dc6-9c33-8a14b8a34073",
    "artistIds": [
        "b8def1d2-10e8-4985-b199-61d7a12503e5",
        "7d9e2e2f-a095-4afb-92ea-ed4e51c7bb0b"
    ],
    "albumId": "7e3d57fe-569f-4195-a32d-c8b4b09b6986",
    "genres": ["Electronic"],
    "styles": ["House", "Deep House", "Downtempo"],
    "explicit": false,
    "playCount": 0,
    "spotify": {
        "id": "3s4U7OHV7gnj42VV72eSZ6",
        "title": "Rather Be (feat. Jess Glynne)",
        "popularity": 75,
        "durationMs": 227833,
        "albumImages": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2737e519297d9876b6afff2ab7b",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e027e519297d9876b6afff2ab7b",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048517e519297d9876b6afff2ab7b",
                "width": 64
            }
        ]
    },
    "youtube": {
        "id": "m-M1AtrxztU",
        "title": "Clean Bandit - Rather Be ft. Jess Glynne [Official Video]",
        "durationMs": 269000,
        "publishedAt": "2013-12-05T15:56:34Z",
        "statistics": {
            "viewCount": "745685130",
            "likeCount": "4132947",
            "favoriteCount": "0",
            "commentCount": "100361"
        },
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/m-M1AtrxztU/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/m-M1AtrxztU/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/m-M1AtrxztU/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/m-M1AtrxztU/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/m-M1AtrxztU/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        }
    },
    "lyrics": "[Intro: Jess Glynne]\nOh-oh, oh, oh, ah\n\n[Verse 1: Jess Glynne]\nWe're a thousand miles from comfort\nWe have travelled land and sea\nBut as long as you are with me\nThere's no place I'd rather be\nI would wait forever\nExalted in the scene\nAs long as I am with you\nMy heart continues to beat\n\n[Pre-Chorus: Jess Glynne]\nWith every step we take, Kyoto to the bay\nStrollin' so casually\nWe're different and the same, gave you another name\nSwitch up the batteries\n\n[Chorus: Jess Glynne]\nIf you gave me a chance, I would take it\nIt's a shot in the dark, but I'll make it\nKnow with all of your heart, you can't shame me\nWhen I am with you, there's no place I'd rather be\n\n[Post-Chorus: Jess Glynne]\nNo, no, no, no, no, no place I'd rather be\nNo, no, no, no, no, no place I'd rather be\nNo, no, no, no, no, no place I'd rather be (Ooh, ooh)\n\n[Verse 2: Jess Glynne]\nWe staked out on a mission\nTo find our inner peace\nMake it everlasting\nSo nothing's incomplete\nIt's easy being with you\nSacred simplicity\nAs long as we're together\nThere's no place I'd rather be\n\n[Pre-Chorus: Jess Glynne]\nWith every step we take, Kyoto to the bay\nStrollin' so casually\nWe're different and the same, gave you another name\nSwitch up the batteries (Yeah)\n\n[Chorus: Jess Glynne]\nIf you gave me a chance, I would take it\nIt's a shot in the dark, but I'll make it\nKnow with all of your heart, you can't shame me\nWhen I am with you, there's no place I'd rather be\n\n[Post-Chorus: Jess Glynne]\nNo, no, no, no, no, no place I'd rather be\nNo, no, no, no, no, no place I'd rather be\nNo, no, no, no, no, no place I'd rather be\nWhen I am with you, there's no place I'd rather be, yeah\n\n[Bridge: Jess Glynne]\nBe\nOoh, ooh\nBe, be, be, be, be, be, be, be, be\nYeah-yeah, yeah-yeah-yeah, yeah (Ooh, yeah)\n\n[Chorus: Jess Glynne]\nIf you gave me a chance, I would take it\nIt's a shot in the dark, but I'll make it\nKnow with all of your heart, you can't shame me\nWhen I am with you, there's no place I'd rather be\n\n[Post-Chorus: Jess Glynne]\nNo, no, no, no, no, no place I'd rather be (Be)\nNo, no, no, no, no, no place I'd rather be\nNo, no, no, no, no (No), no place I'd rather be\nWhen I am with you, there's no place I'd rather be, yeah",
    "type": "track"
},
{
    "id": "158dc56b-89c3-4a6d-b0e2-3f816df87d87",
    "artistIds": ["5a1a6188-8426-445a-b8ee-cc97b8daa1e9"],
    "albumId": "12f06269-6573-445f-9429-ab72d607aa65",
    "genres": ["Hip Hop"],
    "styles": ["Hardcore Hip-Hop", "Pop Rap"],
    "explicit": true,
    "playCount": 0,
    "spotify": {
        "id": "7BMO7O7ImjV8HNTH74Tshv",
        "title": "Cleanin' Out My Closet",
        "popularity": 76,
        "durationMs": 297840,
        "albumImages": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048516ca5c90113b30c3c43ffb8f4",
                "width": 64
            }
        ]
    },
    "youtube": {
        "id": "RQ9_TKayu9s",
        "title": "Eminem - Cleanin' Out My Closet (Official Music Video)",
        "durationMs": 313000,
        "publishedAt": "2009-06-16T23:39:02Z",
        "statistics": {
            "viewCount": "397338581",
            "likeCount": "2432495",
            "favoriteCount": "0",
            "commentCount": "92639"
        },
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/RQ9_TKayu9s/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/RQ9_TKayu9s/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/RQ9_TKayu9s/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/RQ9_TKayu9s/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/RQ9_TKayu9s/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        }
    },
    "lyrics": "[Intro]\nWhere's my snare?\nI have no snare in my headphones\nThere you go\nYeah\nYo, yo\n\n[Verse 1]\nHave you ever been hated or discriminated against?\nI have, I been protested and demonstrated against\nPicket signs for my wicked rhymes, look at the times\nSick is the mind of the motherfuckin' kid that's behind\nAll this commotion, emotions run deep as oceans, explodin'\nTempers flarin' from parents, just blow 'em off and keep goin'\nNot takin' nothin' from no one, give 'em hell long as I'm breathin'\nKeep kickin' ass in the morning and takin' names in the evenin'\nLeave 'em with a taste as sour as vinegar in they mouth\nSee, they can trigger me, but they'll never figure me out\nLook at me now! I bet you're prolly sick of me now\nAin't you, Mama? I'ma make you look so ridiculous now!\n\n[Chorus]\nI'm sorry, Mama\nI never meant to hurt you\nI never meant to make you cry\nBut tonight I'm cleanin' out my closet (One more time!)\nI said I'm sorry, Mama\nI never meant to hurt you\nI never meant to make you cry\nBut tonight I'm cleanin' out my closet (Ha!)\n\n[Verse 2]\nI got some skeletons in my closet and I don't know if no one knows it\nSo before they throw me inside my coffin and close it\nI'ma expose it; I'll take you back to '73\nBefore I ever had a multi-platinum-selling CD\nI was a baby, maybe I was just a couple of months\nMy faggot father must've had his panties up in a bunch\n‘Cause he split, I wonder if he even kissed me goodbye\nNo, I don't, on second thought, I just fuckin' wished he would die\nI look at Hailie, and I couldn't picture leavin' her side\nEven if I hated Kim, I'd grit my teeth and I'd try\nTo make it work with her at least for Hailie's sake, I maybe made some mistakes\nBut I'm only human, but I'm man enough to face 'em today\nWhat I did was stupid, no doubt it was dumb\nBut the smartest shit I did was take the bullets out of that gun\n‘Cause I'da killed 'em, shit, I woulda shot Kim and him both\nIt's my life, I'd like to welcome y'all to The Eminem Show\n\n[Chorus]\nI'm sorry, Mama\nI never meant to hurt you\nI never meant to make you cry\nBut tonight I'm cleanin' out my closet (One more time!)\nI said I'm sorry, Mama\nI never meant to hurt you\nI never meant to make you cry\nBut tonight I'm cleanin' out my closet (Uh)\n\n[Verse 3]\nNow, I would never diss my own mama just to get recognition\nTake a second to listen 'fore you think this record is dissin'\nBut put yourself in my position, just try to envision\nWitnessin' your mama poppin' prescription pills in the kitchen\nBitchin' that someone's always goin' through her purse and shit's missin'\nGoin' through public housing systems, victim of Münchausen's Syndrome\nMy whole life I was made to believe I was sick when I wasn't\n'Til I grew up, now I blew up, it makes you sick to your stomach, doesn't it?\nWasn't it the reason you made that CD for me, Ma?\nSo you could try to justify the way you treated me, Ma?\nBut guess what, you're gettin' older now, and it's cold when you're lonely\nAnd Nathan's growin' up so quick, he's gonna know that you're phony\nAnd Hailie's gettin' so big now, you should see her, she's beautiful\nBut you'll never see her, she won't even be at your funeral (Ha-ha!)\nSee, what hurts me the most is you won't admit you was wrong\nBitch, do your song, keep tellin' yourself that you was a mom!\nBut how dare you try to take what you didn't help me to get?!\nYou selfish bitch, I hope you fuckin' burn in hell for this shit!\nRemember when Ronnie died and you said you wished it was me? (Hehe)\nWell, guess what? I am dead—dead to you as can be!\n\n[Chorus]\nI'm sorry, Mama\nI never meant to hurt you\nI never meant to make you cry\nBut tonight I'm cleanin' out my closet (One more time!)\nI said I'm sorry, Mama\nI never meant to hurt you\nI never meant to make you cry\nBut tonight I'm cleanin' out my closet",
    "type": "track"
},
{
    "id": "e6be2265-e61a-48f9-a295-e51a43c7e083",
    "artistIds": ["7a445082-e674-49b3-92c9-d28452050f66"],
    "albumId": "65e8b5ce-c3d9-4cb3-814b-321411991ad0",
    "genres": ["Hip Hop"],
    "styles": ["Gangsta"],
    "explicit": true,
    "playCount": 0,
    "spotify": {
        "id": "33ZXjLCpiINn8eQIDYEPTD",
        "title": "Shook Ones, Pt. II",
        "popularity": 79,
        "durationMs": 325506,
        "albumImages": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273a2203fa0656cede30f879b97",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02a2203fa0656cede30f879b97",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851a2203fa0656cede30f879b97",
                "width": 64
            }
        ]
    },
    "youtube": {
        "id": "yoYZf-lBF_U",
        "title": "Mobb Deep - Shook Ones, Pt. II (Official HD Video)",
        "durationMs": 265000,
        "publishedAt": "2013-10-20T15:38:20Z",
        "statistics": {
            "viewCount": "241494039",
            "likeCount": "1994496",
            "favoriteCount": "0",
            "commentCount": "75462"
        },
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/yoYZf-lBF_U/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/yoYZf-lBF_U/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/yoYZf-lBF_U/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/yoYZf-lBF_U/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/yoYZf-lBF_U/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        }
    },
    "lyrics": "[Intro: Prodigy and Havoc]\nWord up son, word\nYeah, to all the killers and a hundred dollar billers\nYo I got the phone thing, know I'm sayin', keep your eyes open\nFor real niggas who ain't got no feelings\nKeep your eyes open\nNo doubt, no doubt son, I got this, I got this\nJust watch my back, I got the front, yo\nCheck it out now\nWord up, say it to them niggas, check this out it's a murder\n\n[Verse 1: Prodigy]\nI got you stuck off the realness, we be the infamous\nYou heard of us, official Queensbridge murderers\nThe Mobb comes equipped for warfare, beware\nOf my crime family who got 'nough shots to share\nFor all of those who wanna profile and pose\nRock you in your face, stab your brain with your nose bone\nYou all alone in these streets, cousin\nEvery man for they self in this land we be gunnin'\nAnd keep them shook crews runnin', like they supposed to\nThey come around, but they never come close to\nI can see it inside your face, you're in the wrong place\nCowards like you just get they whole body laced up\nWith bullet holes and such\nSpeak the wrong words, man, and you will get touched\nYou can put your whole army against my team and\nI guarantee you it'll be your very last time breathin'\nYour simple words just don't move me\nYou're minor, we're major\nYou're all up in the game and don't deserve to be a player\nDon't make me have to call your name out\nYour crew is featherweight, my gunshots'll make you levitate\nI'm only nineteen, but my mind is old\nAnd when the things get for real, my warm heart turns cold\nAnother nigga deceased, another story gets told\nIt ain't nothin' really, ayo Dun, spark the Philly\nSo I can get my mind off these yellow-backed niggas\nWhy they still alive? I don't know, go figure\nMeanwhile back in Queens the realness and foundation\nIf I die, I couldn't choose a better location\nWhen the slugs penetrate, you feel a burnin' sensation\nGettin' closer to God in a tight situation now\nTake these words home and think it through\nOr the next rhyme I write might be about you\n\n[Chorus]\nSon, they shook\n'Cause ain't no such things as halfway crooks\nScared to death, scared to look, they shook\n'Cause ain't no such things as halfway crooks\nScared to death, scared to look\nLivin' the life that of diamonds and guns\nThere's numerous ways you can choose to earn funds\nSo some get shot, locked down, and turn nuns\nCowardly hearts and straight up shook ones, shook ones\nHe ain't a crook, son, he's just a shook one\n\n[Verse 2: Havoc]\nFor every rhyme I write it's twenty-five to life\nYo, it's a must, in gats we trust, safeguardin' my life\nAin't no time for hesitation, that only leads to incarceration\nYou don't know me, there's no relation\nQueensbridge and we don't play\nI don't got time for your petty-thinkin' mind\nSon, I'm bigger than those\nClaimin' that you pack heat, but you're scared to hold\nAnd once the smoke clears, you'll be left with one in your dome\nThirteen years in the projects—my mentality is what, kid?\nYou talk a good one, but you don't want it\nSometimes I wonder, do I deserve to live?\nOr am I gonna burn in Hell for all the things I did?\nNo time to dwell on that, 'cause my brain reacts\nFront if you want, kid, lay on your back\nI don't fake jax, kid, you know I bring it to you live\nStay in a child's place, kid, you out of line\nCriminal minds thirsty for recognition\nI'm sippin', E&J got my mind flippin'\nI'm buggin', diggin' my ways out of holes by hustlin'\nGet that loot, kid, you know my function\n'Cause long as I'm alive, I'ma live illegal\nAnd once I get on, I'ma put on all my peoples\nReact quick, spit lyrics like MACs, I hit your dome up\nWhen I roll up, don't be caught sleepin', 'cause I'm creepin'\n\n[Chorus]\nSon, they shook\n'Cause ain't no such things as halfway crooks\nScared to death, scared to look, they shook\n'Cause ain't no such things as halfway crooks\nScared to death, scared to look, they shook\n(We live the life that of diamonds)\n'Cause ain't no such things as halfway crooks\nScared to death, scared to look, they shook\n'Cause ain't no such things as halfway crooks\nLivin' the life that of diamonds and guns\nThere's numerous ways you can choose to earn funds\nSo some get shot, locked down, and turn nuns\nCowardly hearts and straight up shook ones, shook ones\nHe ain't a crook, son, he's just a shook one\n\n[Outro]\nTo all the villains and a hundred dollar billers\nTo real brothers who ain't got no feelings\nG-yeah, the whole Bridge\nQueens get the money\n41st side, keepin' it real, you know\nQueens get the money\n\n[Produced by Havoc]",
    "type": "track"
},
{
    "id": "5dfe1e74-7825-4587-8ed4-7d39cf35f837",
    "artistIds": [
        "e3fc3ff4-9fdb-4b3d-b828-aa8e3e96d6b5",
        "3dbee03c-e547-45e6-9597-3a6e198fb3ba"
    ],
    "albumId": "2a6ce6b2-704e-4662-8261-19ea3308ceaf",
    "genres": ["Electronic", "Rock"],
    "styles": ["Progressive House", "Electro", "House", "Acoustic"],
    "explicit": false,
    "playCount": 0,
    "spotify": {
        "id": "2V65y3PX4DkRhy1djlxd9p",
        "title": "Don't You Worry Child - Radio Edit",
        "popularity": 83,
        "durationMs": 212862,
        "albumImages": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2739cfe80c0c05ce104f7bab18e",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e029cfe80c0c05ce104f7bab18e",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048519cfe80c0c05ce104f7bab18e",
                "width": 64
            }
        ]
    },
    "youtube": {
        "id": "1y6smkh6c-0",
        "title": "Swedish House Mafia ft. John Martin - Don't You Worry Child (Official Video)",
        "durationMs": 335000,
        "publishedAt": "2012-09-14T13:00:34Z",
        "statistics": {
            "viewCount": "956727626",
            "likeCount": "4963380",
            "favoriteCount": "0",
            "commentCount": "168175"
        },
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/1y6smkh6c-0/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/1y6smkh6c-0/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/1y6smkh6c-0/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/1y6smkh6c-0/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/1y6smkh6c-0/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        }
    },
    "lyrics": "[Verse 1]\nThere was a time I used to look into my father's eyes\nIn a happy home, I was a king, I had a golden throne\nThose days are gone, now the memory's on the wall\nI hear the songs from the places where I was born\n\n[Pre-Chorus]\nUp on that hill across the blue lake\nThat's where I had my first heartbreak\nI still remember how it all changed\nMy father said\n\n[Chorus]\nDon't you worry, don't you worry, child\nSee, Heaven's got a plan for you\nDon't you worry, don't you worry now\nYeah\n\n[Drop]\nDon't you worry, don't you worry, child\nSee, Heaven's got a plan for you\nDon't you worry, don't you worry now\nYeah\n\n[Verse 2]\nThere was a time I met a girl of a different kind\nWe ruled the world, I thought I'd never lose her out of sight\nWe were so young, I think of her now and then\nI still hear the songs remindin' me of a friend\n\n[Pre-Chorus]\nUp on that hill across the blue lake\nThat's where I had my first heartbreak\nI still remember how it all changed\nMy father said\n\n[Chorus]\nDon't you worry, don't you worry, child\nSee, Heaven's got a plan for you\nDon't you worry, don't you worry now\nYeah\n\n[Build]\nOh\nOh\nOh\nSee, Heaven's got a plan for you\n\n[Drop]\nDon't you worry, don't you worry, child\nSee, Heaven's got a plan for you\nDon't you worry, don't you worry now\nYeah\nOh\nOh\nOh\nYeah",
    "type": "track"
},
{
    "id": "823e9bfe-074d-48c1-8bde-eb97af0f5f26",
    "artistIds": ["71dc1876-cab8-47cd-98bd-432f49e56ba6"],
    "albumId": "e8672e9b-6fa9-485b-a760-8d185ac8c593",
    "genres": ["Hip Hop"],
    "styles": ["Thug Rap", "Pop Rap"],
    "explicit": true,
    "playCount": 0,
    "spotify": {
        "id": "0O3TAouZE4vL9dM5SyxgvH",
        "title": "Fashion Killa",
        "popularity": 75,
        "durationMs": 236280,
        "albumImages": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2732ae92030b51fb8135d694af9",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e022ae92030b51fb8135d694af9",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048512ae92030b51fb8135d694af9",
                "width": 64
            }
        ]
    },
    "youtube": {
        "id": "snY-MhPcPg0",
        "title": "A$AP Rocky - Fashion Killa (Official Audio)",
        "durationMs": 239000,
        "publishedAt": "2013-07-02T01:50:28Z",
        "statistics": {
            "viewCount": "7236485",
            "likeCount": "65743",
            "favoriteCount": "0",
            "commentCount": "1861"
        },
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/snY-MhPcPg0/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/snY-MhPcPg0/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/snY-MhPcPg0/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/snY-MhPcPg0/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/snY-MhPcPg0/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        }
    },
    "lyrics": "[Chorus]\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a trendy nigga\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a jiggy nigga\nUh, I said\n\n[Verse 1]\nRocking (Uh), rolling (Uh)\nSwagging to the max (Woo)\nMy bitch a fashion killer, she be busy poppin' tags (Alright)\nShe got a lot of Prada (Uh)\nThat Dolce and Gabbana (Uh)\nI can't forget Escada (Uh)\nAnd that Balenciaga (Yeah)\nI'm sippin' purple syrup (Yeah)\nCome be my Aunt Jemima (Right)\nAnd if you is a rider, we'll go shoppin' like mañana (Right)\nHer attitude Rihanna (Uh)\nShe get it from her mama (Yeah)\nShe jiggy like Madonna, but she trippy like Nirvana (Woo)\n'Cause everything designer (Yeah)\nHer jeans is Helmut Lang (Uh)\nShoes is Alexander Wang and her shirt the newest Donna\nKaran (Yeah)\nWearin' all the Cartier frames\nJean Paul Gaultiers 'cause they match with her persona\n\n[Chorus]\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a trendy nigga\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a jiggy nigga\n\n[Verse 2]\nI said I see your Jil Sanders (Uh)\nOliver Peoples (Yeah)\nCostume National, your Ann Demeulemeester (Alright)\nSee Visvim be the sneaker (Uh)\nLanvin or Balmain (Uh)\nGoyard by the trunk (Uh)\nHer Isabel Marant (Alright)\nI love your Linda Farrow, I adore your Dior (Uh)\nYour Damir Doma (Uh)\nVena Cava from the store (Uh)\nI crush down with that top down (Yeah)\nBossy see how I ride 'round (Yeah)\nMami in that Tom Ford\nPapi in that Thom Browne (Uh)\nRick Owens, Raf Simons, boy, she got it by the stock (Uh)\nShe ball until she fall, that means she shop until she drop (Uh)\nAnd Versace, got a lot (Uh)\nBut she may never wear it\nBut she save it so our babies will be flyer than their parents and…\n\n[Chorus]\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a trendy nigga\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a jiggy nigga\nI said her pistol go\n\n[Bridge]\nScoop back tees (Uh)\nBreeze in coupe (Uh)\nSmiling is your treasure, you're so well put together (Yeah, alright)\nBags and links (Uh)\nJeans and shoes (Yeah)\nSpikes and patent leathers, different fabrics mixed together\nBaby, you and me (Uh)\nMe and you (Yeah)\nGo away together, we could get away forever (Yeah)\nAll emotions clashing, thrashing, someone turn the light out\nI met my baby expressed my passion on my fashion night out\n\n[Chorus]\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a trendy nigga\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nHer pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\nI said her pistol go…\n(Doot-doot-doot, bang-bang, boom-boom, pop-pop)\n'Cause she a fashion killer, and I'm a jiggy nigga\nI said her pistol go",
    "type": "track"
},
{
    "id": "0891c3ee-694a-47bb-97e5-e31abf98f8fc",
    "artistIds": [
        "eb8b4363-ecf4-4603-a31b-2d326630455a",
        "99826509-c6ed-4250-bec1-fd1273518be5",
        "cf3dbd89-8fba-45a7-a5d4-abe57251ac43"
    ],
    "albumId": "7736b83a-87b2-4b98-9419-4615b54bb4ac",
    "genres": ["Electronic", "Funk / Soul", "Pop"],
    "styles": ["Funk", "Electro"],
    "explicit": false,
    "playCount": 0,
    "spotify": {
        "id": "2Foc5Q5nqNiosCNqttzHof",
        "title": "Get Lucky (Radio Edit) [feat. Pharrell Williams and Nile Rodgers]",
        "popularity": 81,
        "durationMs": 248413,
        "albumImages": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2731d5cf960a92bb8b03fc2be7f",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e021d5cf960a92bb8b03fc2be7f",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048511d5cf960a92bb8b03fc2be7f",
                "width": 64
            }
        ]
    },
    "youtube": {
        "id": "5NV6Rdv1a3I",
        "title": "Daft Punk - Get Lucky (Official Audio) ft. Pharrell Williams, Nile Rodgers",
        "durationMs": 249000,
        "publishedAt": "2013-04-19T06:55:07Z",
        "statistics": {
            "viewCount": "759587013",
            "likeCount": "4921859",
            "favoriteCount": "0",
            "commentCount": "199840"
        },
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/5NV6Rdv1a3I/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/5NV6Rdv1a3I/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/5NV6Rdv1a3I/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/5NV6Rdv1a3I/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/5NV6Rdv1a3I/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        }
    },
    "lyrics": "[Verse 1: Pharrell]\nLike the legend of the phoenix\nAll ends with beginnings\nWhat keeps the planet spinning\nThe force from the beginning\n\n[Pre-Chorus: Pharrell]\nWe've come too far\nTo give up who we are\nSo let's raise the bar\nAnd our cups to the stars\n\n[Chorus: Pharrell]\nShe's up all night to the sun, I'm up all night to get some\nShe's up all night for good fun, I'm up all night to get lucky\nWe're up all night to the sun, we're up all night to get some\nWe're up all night for good fun, we're up all night to get lucky\nWe're up all night to get lucky, we're up all night to get lucky\nWe're up all night to get lucky, we're up all night to get lucky\n\n[Verse 2: Pharrell]\nThe present has no ribbon\nYour gift keeps on giving\nWhat is this I'm feeling?\nIf you want to leave, I'm with it\n\n[Pre-Chorus: Pharrell]\nWe've come too far\nTo give up who we are\nSo let's raise the bar\nAnd our cups to the stars\n\n[Chorus: Pharrell]\nShe's up all night to the sun, I'm up all night to get some\nShe's up all night for good fun, I'm up all night to get lucky\nWe're up all night to the sun, we're up all night to get some\nWe're up all night for good fun, we're up all night to get lucky\nWe're up all night to get lucky, we're up all night to get lucky\nWe're up all night to get lucky, we're up all night to get lucky\n\n[Bridge: Daft Punk]\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\n\n[Pre-Chorus: Pharrell]\nWe've come too far\nTo give up who we are\nSo let's raise the bar\nAnd our cups to the stars\n\n[Chorus: Pharrell]\nShe's up all night to the sun, I'm up all night to get some\nShe's up all night for good fun, I'm up all night to get lucky\nWe're up all night to the sun, we're up all night to get some\nWe're up all night for good fun, we're up all night to get lucky\nWe're up all night to get lucky, we're up all night to get lucky\nWe're up all night to get lucky, we're up all night to get lucky\n\n[Outro: Pharrell]\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky\nWe're up all night to get lucky",
    "type": "track"
}]

export default function AlbumPage({ params }: AlbumPageProps) {
    const { } = usePlayback(true)

    return (
        <div className={styles.albumPage}>
            <Header />
            <Banner
                description={album.genres.join(", ")}
                picture={album.spotify.images[0].url}
                title={album.name}
                type={album.type}
                metadata={(
                    <>
                        <span>{album.spotify.releaseDate}</span>
                        <span>•</span>
                        <span>{album.totalTracks} songs, 40 min 19 sec</span>
                    </>
                )}
            />
            <div className={styles.tracks}>
                <TrackList>
                    {tracks.map((t, i) =>
                        <TrackRow
                            key={t.id}
                            album={album.name}
                            artists={[]}
                            explicit={t.explicit}
                            image={t.spotify.albumImages[0].url}
                            index={i}
                            time={msToMinutes(t.youtube.durationMs)}
                            title={t.spotify.title}
                        />)}
                </TrackList>
            </div>
        </div>
    )
}