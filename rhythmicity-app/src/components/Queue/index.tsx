import { SearchedTrack } from '@/types/search'
import { Modal } from '../Modal'
import styles from './style.module.scss'
import { Track } from '@/types/track'
import Image from 'next/image'
import { ExplicitSign } from '../ExplicitSign'
import { QueueTrackRow } from './QueueTrackRow'

interface QueueProps {
    tracks: (SearchedTrack | Track)[]
    onClose: () => void
}

const tracks: (SearchedTrack | Track)[] = [
    {
        "id": "299e6fcc-3156-4a56-b196-77dcc80109f9",
        "name": "Xanny Family",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 186000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nThree exotic broads and I got 'em soakin' panties\nTold 'em they were certified, welcome to the Xanny family\nWoah, woah\nHndrxx, say sumn, real spitta\nYeah, yeah\n\n[Chorus]\nThree exotic broads and I got 'em soakin' panties\nTold 'em they were certified, welcome to the Xanny family\nWoah, woah (Welcome to the family, baby)\nWoah, woah (Pop one, c'mon)\nThree exotic broads (Yeah) and I got 'em soakin' panties\nTold 'em they were certified, welcome to the Xanny family\nWoah, woah (Certified)\nWoah, woah (Certified, certified, certified)\n\n[Verse 1]\nThree exotic broads (Woah) and I got 'em actin' jiggy (Woah)\nGot 'em suckin', takin' bars (Woah), now they screamin' \"Team litty\"\nWoah, woah\nWoah, woah (Team litty)\nI'm just tryna slide on lil' shawty, hit the side door (Side)\nYou get penalized, you come around, It ain't enough dough (Nah)\nKeep a bag of Xannies (Woah) if you tryna join the family (Family)\nGot the sauce on me (Sauce) and it's Off-White, tanny (Tanny)\nPuerto Rican freakin', oh, she sneakin', I done ordered up\nShe was goin' in inside the spur like a party bus\nPardon me, before I take a greed I never brag or boast (Never brag)\nShe don't speak no inglo, but I know she like to toot that coke\n\n[Chorus]\nThree exotic broads and I got 'em soakin' panties\nTold 'em they were certified (Certified), welcome to the Xanny family\nWoah, woah (Welcome to the fam', baby, welcome to the fam')\nWoah, woah (Welcome to the fam')\nThree exotic broads and I got 'em soakin' panties (Got 'em)\nTold 'em they were certified , welcome to the Xanny family\nWoah, woah (Got 'em)\n\n[Verse 2]\nPromethazine, codeine and champagne for us\nThe sauce look so clean like some angel dust\nWe workin' everyday, it ain't the same for us (Freebandz)\nYou comin' to the crib, bring a gang of tuss (Woah, woah)\nI dip it in the blunt, I'm tryna smoke the mud (Smoke up)\nI loaded up my gun, I'm tryna smoke the plug\nWhen I get to wavin' this hammer I'm gonna soak ya up (Uh)\nI got trophies, I got Dolce, got a way bigger bus (Way bigger bus)\nI get loaded to the ceiling, gotta roll me some bud (Yeah)\nI'mma dab inside that backwood, I don't play with my nose\nGot some oxycontin, some roxy, 'bout to play with these hoes\nGot these bitches drunk and sloppy, ready to come out they clothes (Two)\n\n[Chorus]\nThree exotic broads and I got 'em soakin' panties\nTold 'em they were certified , welcome to the Xanny family\nWoah, woah (Welcome to the fam')\nWoah, woah (Welcome to the fam')\nThree exotic broads and I got 'em soakin' panties\nTold 'em they were certified, welcome to the Xanny family\nWoah, woah (Certified)\nWoah, woah (Certified, certified, certified, team litty)\n\n[Outro]\nPuerto Rican freakin', oh, she sneakin', I done ordered up\nShe was goin' in inside the spur like a party bus\nPardon me, before I take a greed I never brag or boast\nShe don't speak no inglo, but I know she like to toot that coke",
        "type": "track"
    },
    {
        "id": "ca6552e9-5dc1-420f-a241-30c09ab5f3f6",
        "name": "Lil Haiti Baby",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 278000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nYeah, yeah\nIt’s that EVOL, ah\nYou understand me?\n\n[Chorus 1]\nI bagged this bad bitch, it was nothing to get her\nYou want a whole brick? Oh it’s nothing to get ‘em\nOh, you want diamonds like this? It wasn’t nothing to get ‘em\nI had to focus, then it wasn’t nothing to get ‘em\n\n[Verse 1]\nHey, 30,000 on a watch, I swear thank God I’m ballin’\nFeds watching on my spot, they say somebody called ‘em\nHottest nigga in the streets, they see my Audemars\nHottest nigga in the streets, 3,000 grams a show\nBoston George, I’m with that game, you got that girl that blow\nOh, you want my life, that's life for me, that’s all I know\nCatch me pissing out the codeine from the night before\nThis for Khaled, this for niggas riding on eights and vogues\nThis for G-rod, C-Rod, all these niggas banging B’s\nThis the greatest story never told, you gotta see it\nI, I got some names but I ain’t gon’ never drop ‘em\nAyy, she say my name but she won’t ever drop me\n\n[Chorus 2]\nYou want an R&B chick, shawty it ain’t nothin’ to get her\nYou want to run around the town, well it ain’t nothin’ to get her\nYou want to drive around in that Rolls, you know it ain’t nothin’ to get her\nYou know that I’m gonna make homies ride for me, it ain’t nothin’ to get ‘em\n\n[Verse 2]\nWe throwed away that money, 'cause that mula swole\nI got 30 grams of boy, I’m servin’ in the cold\nGot 58 grams of boy, we servin’ pita\nThey say they got Magnolia shawty bangin’ needles\nThey trapped out Angola, they was out the NOLA\nTo fuck around in that NOLA, got to be a cobra\nThey cooped up with that yola, now that cook Coke Cola\nI fucked around and showed them that my heart is colder\nMy water whippin’ issues now we packin' pistols\nThey packin’ gats and lots these niggas sending missiles\nThey say they hate the kid, the kid was getting mula\nYou wanna ask around, then you can ask my jeweler\n\n[Chorus 3]\nBuddy came around, he shot ‘em on a bike\nOh he poppin’ wheelies, a lil' Haiti baby\nOh they say that nigga he just a lil' Haiti baby\nOh they say that boy he just a lil' Haiti baby\nShoot in broad day, he shoot in broad day\nShot the whole window up in broad day\nOh that’s that lil' Haiti baby, Haiti baby\nOh that’s that lil' Haiti baby, Haiti baby\n\n[Post-Chorus 1]\nDumping down the pills, I feel my head explodin’\nRoll a pound of dope, I gotta keep on smokin’\nMoney comin’ in, we ain’t gon’ never spend it\n10,000 bags of kush, we ain’t gon’ never listen\nI just wanna be there for my nigga, woo\nI just wanna go back to the Bentley store\nI just wanna go back to the Lamb' store\nI just wanna buy another Rover though\nI just wanna get back on a yacht tomorrow\nI just wanna buy another spot tomorrow\nAll this money comin’ in, can’t never spend it\nI swear, all this money comin’ in, we’re still winnin’\nShoot in broad day, shoot in broad day\nShot the whole window up in broad day\nOh that’s that lil' Haiti baby, Haiti baby\nOh that’s that lil' Haiti baby, Haiti baby\n\n[Verse 3]\nCoke in all the cars, we ain’t got no facade\nPull up in that ‘Rari, we don’t know facade\nPull up with that yappa, it wasn’t no facade\nLettin’ off all the rounds, it wasn’t just no facade\n\n[Chorus 3]\nBodies came around, he shot ‘em on a bike\nOh he poppin’ wheelies, he a lil' Haiti baby\nOh they say that nigga, he a lil' Haiti baby\nOh they say that boy, he a lil' Haiti baby\nShoot in broad day, he shoot in broad day\nShot the whole window up in broad day\nOh that’s that lil' Haiti baby, Haiti baby\nOh that’s that lil' Haiti baby, Haiti baby\n\n[Post-Chorus 2]\nDumpin’ back these pills, I feel my head explodin’\nJumpin’ out these whips, we ain’t on no facade\nPull up in that ‘Rari, ain’t no no facade\nPull up in that ‘Rari, ain’t no no facade\nShoot in broad day, he shoot in broad day\nShot the whole window up in broad day\n\n[Outro]\nEVOL",
        "type": "track"
    },
    {
        "id": "6a6172f8-612b-4355-91db-e4305c60502d",
        "name": "Photo Copied",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 173000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nYeah, you lucky\n\n[Chorus]\nYeah, I'm on savage time nigga\nI'm on savage time\nI'm on ratchet time\nI'm gon' smash her she so outta pocket\nI'm gon' smash her but she photocopied\n\n[Verse 1]\nOnce I adapted I got more options\nI told her no, that bitch she told me, \"Yeah, Zaddy\"\nMan she, tryna get at me\nHoe you telling they business so tacky\nWe don't wanna cuddle with none of you bitches\nWe don't wanna hustle with none of you niggas\nUh, I'm cool on them, don't even dap them niggas\nUh, I was in the trap they tried to trap a nigga\nI pull up in that new Maybach and they wave\nThese niggas won't show no deuces they got hoe ways\nI walk inside the club and they wave\nI put headshots and more hits out on my enemies\n\n[Pre-Chorus]\nI got love for all my niggas who got love for me\nI got bloods, crips, and GDs in my family tree\nAnd where ever I go them vice lords with me\nYou don't want no static we just got these things established\nBobble head bitches, they get smashed automatic\nYour baby-momma outta pocket knowing I'm a savage\nI told you I'ma give you that dope\nI told you I'ma give you that dope\nYou niggas don't exist we eat filet mignon\nGo brazy with your bitch she try to stay the night\nThe first thing in the AM send her on a flight\n\n[Chorus]\nYeah, I'm on savage time nigga\nI'm on savage time\nI'm on ratchet time\nI'm gon' smash her she so outta pocket\nI'm gon' smash her but she photocopied\n\n[Verse 2]\nI passed her off like, \"Ooh, bitch, I'm him\"\nI'm seein' the way she actin' on the 'Gram\nYou misrepresenting who I am\nOh, hold up\nThat photoshop making me nervous\nI told you that's making me nervous\nI know you ain't saving that pussy\nYou let somebody play in that pussy\nAnd it's oh, it’s okay though\n\n[Pre-Chorus]\nI got love for all my niggas who got love for me\nI got Bloods, Crips, and GDs in my family tree\nAnd wherever I go them Vice Lords with me\nYou don't want no static we just got these things established\nBobble head bitches, they get smashed automatic\nYour baby-momma outta pocket knowing I'ma savage\nI told you I'ma give you that dope\nI told you I'ma give you that dope\nYou niggas don't exist we eat filet mignon\nGo brazy with your bitch she try to stay the night\nThe first thing in the AM send her on a flight\n\n[Chorus]\nYeah, I'm on savage time nigga\nI'm on savage time\nI'm on ratchet time\nI'm gon' smash her she so outta pocket\nI'm gon' smash her but she photocopied",
        "type": "track"
    },
    {
        "id": "2e579994-6772-4a95-9fe2-9dd2c9bf2ded",
        "name": "Seven Rings",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 206000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nYeah, I told 'em\nI told 'em if it's a problem, say it's a problem\nI told you off the top that I was solid\nI told you we get money by the pillow\nI told you half of these niggas with me win now\n\n[Chorus]\nMy left and right hand Robert Horry\nMost my niggas pop Xans unemployed\nI can't stop, I'm goin' in, steroids\nI tried to tell you when I came, it was God\nI'm washin' off my hands with the mula like it's Ajax\nSippin' out my cup, hell no, don't you taste that\nHundred percent chance I done doped up and laced that\nChillin' with my family, hangin' low, I embrace them\n\n[Verse 1]\n20 different strippers, money double, triple\nStarted off slizzered, they callin' me The Wizard\nValet got that Porsche, Casino got that Porsche\nKillers all I know, fill 'em up with the dough\nYou know I'm on that syrup, about to send the word\nDo niggas really argue? Who gon' shoot you first\nFatface wanna do you, Blade wanna do you\nThis bitch from Guyana, layin' low with that hammer\nTry not to fuck her on camera\nI pray that my young nigga don't kill you on camera\nYou come too close, nigga, I'ma have to kill you on camera\nI hate to discuss it\nIf Bubba don't trust you, nigga, you know I don't trust you\n\n[Chorus]\nMy left and right hand Robert Horry\nMost my niggas pop Xans unemployed\nI can't stop, I'm goin' in, steroids\nI tried to tell you when I came, it was God\nI'm washin' off my hands with the mula like it's Ajax\nSippin' out my cup, hell no, don't you taste that\nHundred percent chance I done doped up and laced that\nChillin' with my family, hangin' low, I embrace them\n\n[Verse 2]\nHeater on your side, it's a hundred percent chance\nSome of these people by my side is straight up out the can\nWe come from the bottom, upper echelon\nI came here to serve you, need some cash on delivery\nI just hope she washed her mouth out before you kiss her\nMy downtown bitch said, \"Did you heard me?\"\nI think she stays five minutes from Bourbon\nI had an Arizona plug, used to serve me\nI throwed that money in the bag cause it was dirty\nHe got that chopper on him now and he hurtin'\nI know he 'bout to let it go and that's for certain\nI know he 'bout to let it go and that's for sure\n\n[Chorus]\nMy left and right hand Robert Horry\nMost my niggas pop Xans unemployed\nI can't stop, I'm goin' in, steroids\nI tried to tell you when I came, it was God\n(I tried to tell you)\nI'm washin' off my hands with the mula like it's Ajax\nSippin' out my cup, hell no, don't you taste that\nHundred percent chance I done doped up and laced that\nChillin' with my family, hangin' low, I embrace them\n\n[Bridge]\nTold 'em if it's a problem, say it's a problem\nI told you off the top that I was solid\nI told you we get money, by the pillow\nI told you half of these niggas with me win now\n\n[Outro]\nMy left and right hand Robert Horry\nMy left and right hand Robert Horry\nPlus my nigga pop Xans unemployed\nI tried to tell you when I came, it was God",
        "type": "track"
    },
    {
        "id": "5bbc5637-008e-4e83-bdf9-d09a20b14340",
        "name": "Lie to Me",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 213000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nI see you Spin, this right here the truth\nGang, gang\nFuture Hendrix, just like that\nCut it up\n\n[Chorus]\nI'm a motherfuckin' boss (I'm a motherfuckin' boss)\nI'm a motherfuckin' boss, I'm a motherfuckin' boss\nI'm a motherfuckin' giant\nI see how you watchin', I see how you lookin'\nI see how you smile\nI sit back and watch how the drama unfold while I'm on recline\nI know the homies, my brothers, my cousins\nThey gon' ride for me\nI know Tiarra, and Britney, and Keisha\nThey gon' lie for me\nI got some people they know that I love 'em\nBut I ain't got time to see\nI see in people the moves that I'm makin'\nYou know I'm playin' for keeps\nYou niggas ain't seein' me, never, you're never gon' see me\n\n[Verse 1]\nI got big racks, all in your face and you 'bout to get silent\nBig 'Bach, fuck that little bitty car that you're drivin' (skrrt, skrrrt)\nBig racks, anything I'm whippin' barely got mileage\nBig racks, and you know that bitch that you're with, she mine\nYeah she my bitch, nigga\nShe wanna hit on me under the covers like lovers\nLike we divine\nShe recognize that I'm so thorough\nI'm one of them breeds, I'm all on her mind\nShe wanna look me eye to eye and tell me her lies\nI had accepted you\nJust like you came and never look down on you\nTell that lil' nigga to stay in his place before I expose you\nYou take one shot at me, you know that'll cause an explosion\nNever fight the hand that feeds you, nigga\nYou gon' pay a nigga, yeah, to squeeze the trigger\nYou an itchy finger blog type of nigga\nAnd you know me, nigga\n\n[Chorus]\nI'm a motherfuckin' boss (I'm a motherfuckin' boss)\nI'm a motherfuckin' boss, I'm a motherfuckin' boss\nI'm a motherfuckin' giant\nI see how you watchin', I see how you lookin'\nI see how you smile\nI sit back and watch how the drama unfold while I'm on recline\nI know the homies, my brothers, my cousins\nThey gon' ride for me\nI know Tiarra, and Britney, and Keisha\nThey gon' lie for me\nI got some people they know that I love 'em\nBut I ain't got time to see\nI see in people the moves that I'm makin'\nYou know I'm playin' for keeps\nYou niggas ain't seein' me, never, you're never gon' see me\n\n[Verse 2]\nI got way way too many issues\nSome are coming out on the internet\nBaby girl sayin' that she miss you\nIs it too late for a comeback\nI had to live with this crown on my head\nI don't got no regrets, I don't have no regrets\nI got to live with this crown on my head\nI got to talk to my homies up stairs\nSorry to tell you I gotta address it\nFeeling this game and I'm learning my lesson\nAccepting the hate when it's coming\nI jumped out the Wraith on them bums\nI tell you you're wrong when you're right\nI'm never gon' judge, no I'm never gon' judge\nYou got a nigga, but I know you love me, baby\nI know you love me\n\n[Chorus]\nI'm a motherfuckin' boss (I'm a motherfuckin' boss)\nI'm a motherfuckin' boss, I'm a motherfuckin' boss\nI'm a motherfuckin' giant\nI see how you watchin', I see how you lookin'\nI see how you smile\nI sit back and watch how the drama unfold while I'm on recline\nI know the homies, my brothers, my cousins\nThey gon' ride for me\nI know Tiarra, and Britney, and Keisha\nThey gon' lie for me\nI got some people they know that I love 'em\nBut I ain't got time to see\nI see in people the moves that I'm makin'\nYou know I'm playin' for keeps\nYou niggas ain't seein' me, never, you're never gon' see me\nI'm a motherfuckin' boss (I'm a motherfuckin' boss)\nI'm a motherfuckin' boss, I'm a motherfuckin' boss\nI'm a motherfuckin' giant\nI see how you watchin', I see how you lookin'\nI see how you smile\nI sit back and watch how the drama unfold while I'm on recline\nI know the homies, my brothers, my cousins\nI'm a motherfuckin' boss",
        "type": "track"
    },
    {
        "id": "28907480-fe7d-40b9-8cea-ef706563f77e",
        "name": "Program",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 177000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nWe 'bout to win so big\nTalkin' 'bout hydraulic money\nYeah!\n\n[Chorus 1]\nMoney comin' in, tell me what's the program\nTwenty-five bags of kush, yeah, get with the program\nShawty want that wave, get the program\nShawty want that wave, what's the program?\nThumbin’ through the yay, what's the program?\nFuckin’ up the check, what's the program?\nI just blowed a bag, what's the program?\nI just went shoppin’, what's the program?\n\n[Verse 1]\nObama on my line\nWhat's the program\nYou know I don't give a damn\nWhat's the program\nI go out the way\nThat's the program\nMy lingo far away\nThat's the program\nDifferent color bags\nThat's the program\nI don't fuck with swag\nThat's the program\nToo much damn charisma\nBut what's the program\nSizzle, that's my nigga (808)\nWhat's the program\nChoppers and them AR's\nThat's the program\nAR with the nuts\nThat's the program\nExtendo FN\nThat's the program\nMoney best friend\nThat's my program\n\n[Chorus 2]\nFucking up the check\nWhat's the program\nI just blowed a bag\nWhat's the program\nI just went shopping\nWhat's the program\nShawty want that wave\nWhat's the program\nMarried to this money\nWhat's the program\nMarried to this trap\nWhat's the program\nMarried to this trap\nWhat's the program\nLet's get married to the trap\nWhat's the program\n\n[Bridge]\nMy BFF that cash\nThat's the program\nMy BFF that cash\nThat's the program\n\n[Verse 2]\nEvery nigga 'round me a gangbanger\nAin't hollywood bitch\nI'm too famous\nNever talk to the pink paranoia, fuck\nI just popped six Xans on a Quaalude\nShawty gave me head on that Adderall\nG-wagons and Rovers, yeah I bought it for her\nMetro told me hit them with the slow flow\nSizzle in the cut with the fo-fo\nLot of money make a bitch evil\nThat's why I gotta keep a desert eagle (Freebandz)\n\n[Chorus 2]\nFucking up the check\nWhat's the program\nI just blowed a bag\nWhat's the program\nI just went shopping\nWhat's the program\nShawty want that wave\nWhat's the program\nMarried to this money\nWhat's the program\nMarried to this trap\nWhat's the program\nMarried to the trap\nWhat's the program\nMarried to the trap\nWhat's the program",
        "type": "track"
    },
    {
        "id": "f9a822bb-b925-4afa-b4f5-73d8516ba6f9",
        "name": "Fly Shit Only",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 213000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nI take my drugs in doses (drugs in doses...)\n\n[Pre-Chorus]\nI been waking up to bitches in my hotel suite\nWe been gone on the molly\nHolding onto Friday\nWhy you looking at me shawty\nRecognizing I'm the only, only, only one that's ballin'\nOnly one that’s ballin'\nOnly one who’s going out the country\nGotta keep a translator for the models\nOnly one, I’m only reppin' fly shit only\nKeep some fly shit on me, keep a fly bitch on me\n\n[Chorus]\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only\n\n[Verse 1]\nMy trainers are matching my jacket\nI’m strapped with that ratchet\nI’m strapped with that Bape and that ape\nI’m gone off these medicals, gone off these medicals\nMaybe one day I'ma get out the drank\nAnd maybe one day we can fuck in the bank\nI made me a Porsche out of two and a quarter\nI got to Morocco and lay in some foreigns\nThen I come back to Onyx and find me that one I can fuck on\nAnd touch on and turn up and turn on\nWe don’t watch TV, we count Fettuccine\n4 and a half, it’s right under my beanie\nI made me some snaps then I fucked on a genie\nPut her in a cab and I jumped in a 'Ghini\nYou gon’ need yellow tape when I step on the scene\nWhen you send me an invite, I come with a biznite\nShe wrapped up in plastic, got coke in the mattress\nAll of this shit is about living lavish\nThis money, these cars, and these bitches, these carats\nThese radical styles, I’ma give you a style\nYou can take it, your new style ain't gon' make you a pile\n\n[Pre-Chorus]\nI been waking up to bitches in my hotel suite\nWe been gone on the molly\nHolding onto Friday\nWhy you looking at me shawty\nRecognizing I'm the only, only, only one that's ballin'\nOnly one that’s ballin'\nOnly one who’s going out the country\nGotta keep a translator for the models\nOnly one, I'm only reppin' fly shit only\nKeep some fly shit on me, keep a fly bitch on me\n\n[Chorus]\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only\n\n[Verse 2]\nLight skinned bone the same color macaroni\nPut her hair in a pony, hit a note like Toni\nI know you hoes been lonely, now I’m back on my lonely\nAnd I'm back how you want it, and I'm back and I want it\nMade a film like Sony, fuck the fake and the phony\nI gots cake in the morning, I rock Adidas and Margielas\nI be staying at the telly, eat a sandwich out the deli\nAnd my life is like Belly, young Future, sincerely\n\n[Pre-Chorus]\nI been waking up to bitches in my hotel suite\nWe been gone on the molly\nHolding onto Friday\nWhy you looking at me shawty\nRecognizing I'm the only, only, only one that's ballin'\nOnly one that’s ballin'\nOnly one who's going out the country\nGotta keep a translator for the models\nOnly one, I'm only reppin' fly shit only\nKeep some fly shit on me, keep a fly bitch on me\n\n[Chorus]\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly shit only, fly shit only\nFly, fly, fly, fly, fly, fly, fly...\n\n[Produced by DJ Spinz]",
        "type": "track"
    },
    {
        "id": "5f2a5aa5-9378-4264-bfd1-d6c9f9639ec2",
        "name": "Wicked",
        "artistNames": ["Future"],
        "albumName": "EVOL",
        "explicit": true,
        "playCount": 0,
        "durationMs": 176000,
        "genres": ["Hip Hop"],
        "styles": ["Trap"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02626745b3aa04899001a924ad",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851626745b3aa04899001a924ad",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\n(DJ Esco Moe City the coolest DJ on the muthafuckin' planet)\nWicked, wicked, wicked, wicked\nWicked tunes, you know what I'm sayin'?\n(Southside)\nWizard\n(Metro Boomin want some more, nigga)\n\n[Chorus]\nWicked, wicked, wicked, wicked\nHold up, wicked, wicked, wicked, wicked\nWoo, wicked, wicked, wicked, wicked\nHold up, wicked, wicked, wicked, wicked\nStand up in the motor, bust the dashboard\nStand up in the motor, bust the dashboard\nHold up, wicked, wicked, wicked, wicked\nWicked, wicked, wicked, wicked\n\n[Verse 1]\nCandles burning, money burning, graveyard these niggas\nPhantom parkin', big dawg barkin' hey\nLortabs on me, oh-oh-oh-oh\nShawty want that wave, oh-oh-oh-oh\nI'm drippin' Cartier, oh-oh-oh-oh\nPut a gold bird on you, that's what's happening\nI put that lingo on her, she was Spanish\nI fill a one liter up with Xannies\nThis continental and it's panoramic\nIt's complimentar-ary to the savages\nYou fuck around with me, it be a tragedy\nI want green, green, green, no asparagus\nI drink lean, lean, lean it ain't embarrassing\n\n[Chorus]\nHuh, wicked, wicked, wicked, wicked\nHold up, wicked, wicked, wicked, wicked\nWooh, wicked, wicked, wicked, wicked\n\n[Verse 2]\nNow she going, now that bitch going\nI purchase Avianne and now she lit, huh\nWedding band rings on me lit, huh\nMarried to the game, I'm the shit, huh\nWoah, woah, woah, woah\nBitch, we made men\nWe ain't pullin' up at cribs that we can't get\nYou can't pull a bitch on Instagram I ain't hit, huh\nAnd then she tellin' lies about me cause she ain't shit, uh\nShe want that big-big dog status\nI was in the alley with them nickel bags tallied\nNow I'm Taliban Gang status, that's what's happenin'\nAnd you niggas can't get close cause you don't know me\nIt ain't no more dip and dabbin', hangin' low key\nThese bitches see me and they panic\nI can't believe it, I was on the corner gamblin'\n\n[Chorus]\nWicked, wicked, wicked, wicked\nHold up, wicked, wicked, wicked, wicked\nWicked, wicked, wicked, wicked\nWicked, wicked, wicked, wicked\nStand up in the motor, bust the dashboard\nStand up in the motor, bust the dashboard\nWicked, wicked, wicked, wicked, wicked\nHold up, wicked, wicked, wicked, wicked",
        "type": "track"
    },
    {
        "id": "b79998e6-ffed-455a-84ca-d48fe5034c71",
        "name": "Artist",
        "artistNames": ["A Boogie Wit da Hoodie"],
        "albumName": "Artist",
        "explicit": true,
        "playCount": 0,
        "durationMs": 244000,
        "genres": [],
        "styles": [],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b27370ed76855fb92d540a595463",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e0270ed76855fb92d540a595463",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d0000485170ed76855fb92d540a595463",
                "width": 64
            }
        ],
        "lyrics": "[Intro]\nI promised you would've liked it\nIf I was invited\n\n[Chorus]\nShe said she wanna be mine\nShe wasn't with it to ride\nI had to kick her aside\nI know it just ain't right\nBut baby you was invited\nI promised you would've liked it\nShe know I be on my grind\nSo I don't really have time\nTo hit you back on time\nI would've been in your life\nBut I just wasn't invited\nI think that I would've liked it\n\n[Verse 1]\nI was excited, I thought you was mine\nYou were really wastin' my time\nBut damn I can't lie\nShe ride the pipe like she bike it\nYou was the rock to my diamond\nThe way we could've been shining\nWe would've been fine\nBut girl you had to decide\nI thought that you was my type\nI wish that I could rewind it\nBut I guess I'll never mind it\nTell me what you want\nTell me why you frontin'?\nIs this really what you wanted?\nKeep it a hunnit\nEvery time you started fussin'\nI changed the subject\nEvery time you hear this song is gon' get you upset\nYou gon' hear it in they headphones on the buses\nIf I see you up in public straight stuntin'\nCop another pair of Mains then I go to London\nWould've put you on a plane in some Red Bottoms\n\n[Chorus]\nShe said she wanna be mine\nShe wasn't with it to ride\nI had to kick her aside\nI know it just ain't right\nBut baby you was invited\nI promised you would've liked it\nShe know I be on my grind\nSo I don't really have time\nTo hit you back on time\nI would've been in your life\nBut I just wasn't invited\nI think that I would've liked it\n\n\n[Verse 2]\nYou was a slide\nI don't think I can look at you in ya eyes\nYou cheated on me and lied\nAnd I think you liked it\nYou're so damn trifling\nYou was a thot and I wifed it\nThere's no one like this\nLook at my ice you could've been right beside it\nI'm still thug lifin' with no gun license\nYou my lil' light skin\nCause I know she gon' hide it\nYou pro'lly think I'm bluffin'\nI ain't frontin' I turn nothing into something\nNow I'm stuntin it's just us I won't switch up yeah\nI love my Bousins others talk behind my back\nSo I can't trust them\nOh I think I started something now they upset\nEverybody I came up with I'm still stuck with\nEvery girl that I was with I had no luck with\nNow all I ever wanna do is boss shit\n\n[Chorus]\nShe said she wanna be mine\nShe wasn't with it to ride\nI had to kick her aside\nI know it just ain't right\nBut baby you was invited\nI promised you would've liked it\nShe know I be on my grind\nSo I don't really have time\nTo hit you back on time\nI would've been in your life\nBut I just wasn't invited\nI think that I would've liked it\n\n[Outro]\nWhy you think my name is Artist? I'm an Artist",
        "type": "track"
    },
    {
        "id": "3e4701d2-f8c2-4ca7-8427-caf7b67c44ad",
        "name": "Do You See",
        "artistNames": ["Warren G", "Nate Dogg"],
        "albumName": "Regulate… G Funk Era",
        "explicit": true,
        "playCount": 0,
        "durationMs": 246000,
        "genres": ["Hip Hop"],
        "styles": ["Gangsta", "G-Funk"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273f6b9b62ea130943d371b69ef",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02f6b9b62ea130943d371b69ef",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851f6b9b62ea130943d371b69ef",
                "width": 64
            }
        ],
        "lyrics": "[Intro: Gil Scott-Heron]\nThe blues has always been totally American\nAs American as apple pie\nAs American as the blues\nAs American as apple pie\nThe question is why\nWhy should the blues be so at home here?\nWell, America provided the atmosphere\n\n[Verse 1]\nYou don't see what I see\nEvery day as Warren G\nI take a look over my shoulder, as I get older\nGetting tired of mothafuckas saying, \"Warren I told ya\"\nYou don't hear what I hear\nBut it's so hard to live through these years\nWith these funny-bunny niggas, ain't shit changing\nGot my Mama wondering if I'm gang banging\nBut I don't pay attention to these father figures\nI just handle mine, and I'm rolling with my niggas\nOff to the VIP\nYou see Snoop Dogg and Warren G\nUnbelievable how time just flies\nRight before your eyes, but you don't recognize\nNow who's the real victim, can you answer that\nThe nigga that's jacking or the fool getting jacked?\n\n[Chorus]\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\n\n[Verse 2]\nAnother sunny day, another bright blue sky\nAnother day, another muthafucka die\nThese are the things I went through when I was growing up\nThere's only one hood, and niggas shit be throwing up\nAnd I knew it, there really ain't nothing to it\nThinking every fool's gotta go through it\nNow let's go back, how far, back in time\nDragging to these hookas trying to mack for mine\nI remember when we all used to stop at the spot\nBack then my nigga-name was Snoop Rock\nIt was all so clear, '87, '88, then '89s the year\nYou say everywhere we roll, you can say we roll thick\nWay back then 2-1-3 was the clique\nServin' to stay paid I was just a young hog\nWarren G, Snoop Rock and Nate Dogg\n\n[Chorus]\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\n\n[Verse 3]\nYou make me wanna holla, get out the game\nToo many muthafuckas know my name\nWhile Snoop Dogg's serving time up in Wayside\nI puts it down on the street, don't try to take mine\nI had to reassure the homie that he wasn't alone\nWe'd talk, and him and Nate'd conversate on the phone\nHe kept saying, \"Nigga, it won't be long\nBefore a little skinny nigga like me'll be home\"\nI said \"Snoop, things done changed, it's not the same\nWe need to get up out the game\n'Cause we can get paid in a different way\nWith you kicking dope rhymes and I DJ\"\nWell as time goes past, slowly we try to make it\nBut things are getting hectic, I just can't take it\nShould I, A: Go back to slanging dope\nOr should I, B: Maintain and try to cope\nOr should I, C: Just get crazy and wild\nBut no, I chose D: Create the G-Child\nIt's been on ever since with me and Mista Grimm\nThis shit is getting so hectic that I can't even trust him now\nWhat would you do for a Warren G cut\nWould you act the fool and nut the fuck up\nBack the fuck up, act the fuck up\nNiggas talk shit they get smacked the fuck up, straight up\n\n[Chorus]\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years\nYou don't see what I see\nEvery day as Warren G\nYou don't hear what I hear\nBut it's so hard to live through these years",
        "type": "track"
    },
    {
        "id": "1182f625-f1da-472b-92fa-587ddf0a8f6d",
        "name": "Gangsta Sermon",
        "artistNames": ["Warren G", "B-Tip", "Ricky Harris"],
        "albumName": "Regulate… G Funk Era",
        "explicit": true,
        "playCount": 0,
        "durationMs": 38000,
        "genres": ["Hip Hop"],
        "styles": ["Gangsta", "G-Funk"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273f6b9b62ea130943d371b69ef",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02f6b9b62ea130943d371b69ef",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851f6b9b62ea130943d371b69ef",
                "width": 64
            }
        ],
        "lyrics": "Good evenin'\nI must repeat, and cheat once again\nWe gon' talk about bitches and hoes\nThere is somethin wrong with 'em\nEspecially now (aha)\nThey want niggas (aha) to give 'em chronic (aha)\nAnd all that shit too (aha)\nBut bitch (aha)\nI said bitch (aha)\nI ain't gonna go for it (aha)\nNot now (aha)\nNot ever (aha) (aha)(aha) (aha)\nLet's raise the offerin'",
        "type": "track"
    },
    {
        "id": "b8af7911-d54d-4a3e-9a96-e25777fe2859",
        "name": "Recognize",
        "artistNames": ["Warren G", "The Twinz"],
        "albumName": "Regulate… G Funk Era",
        "explicit": true,
        "playCount": 0,
        "durationMs": 181000,
        "genres": ["Hip Hop"],
        "styles": ["Gangsta", "G-Funk"],
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273f6b9b62ea130943d371b69ef",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02f6b9b62ea130943d371b69ef",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851f6b9b62ea130943d371b69ef",
                "width": 64
            }
        ],
        "lyrics": "[Verse 1: Warren G & Trip Locc]\nThe place is here, the time is right\nFor the Twinz and Warren G to rip shit tonight, right\nHold on tight to your seat\nComin' from the city that's low, urban life near the beach, peep\nSo come one, come all, fall into my smooth flow\nIt's the Trip L-O-double-C yo\nThe game is trump tight, ain't no need for you to boo me\n'Cause after it's over, all you hoes gon' wanna do me\nIt's part of the plan to get mine from the jump\nG-Dub hooked it up, so you know its gotta straight bump\nA typical day on the Eastside\nA lot of gangstas buckmouths\nAnd some brothers sellin' bean pies\nBut that's how it goes in the city where I was born\nFamilies mourn, niggas slippin', never gettin born\nSo that's why you gotta stay alert\n'Cause everyday somebody's out there tryin' to put in a little work\nFor the hood, or just on the solo\nWalking in Long Beach real late is a no-no\nBut don't let me scare you, you do what you gotta do\nRespect is a must, checkin' niggas that try to check you\n\n[Chorus: Snoop Dogg]\nY'alls niggas betta recognize\nFocus your eyes 'cause my homie's high\nY'alls niggas betta recognize\nE-E-E-E-Eastside\n\n[Verse 2: Warren G]\nTick, tock, tickin to the Era\nIts Warren G with the Twinz funk Era\nN to the A to the T to the E\nThe S to the N to the double O P\n\n[Verse 3: Wayniac]\nI'm a take you on a trip\nSo keep the game I display mane\nI run it to ya in a gangsta kinda way (hey)\nIt's all good when you dealin' with the Locc\nStill blazed the smoke with the homies and the kin-folk\nAnd ain't no nigga gonna be takin mine\nI'm servin' niggas with the quicka picka upper known as a nine\nSo if you really watch this trigga flow\nIt's kinda itchy but I know I shoulda pulled it a long time ago\n'Cause I be connecting like dot to dot\nSo when it gets hot well I gotta shake the spot\nAnd move to that other level see Wayniac coming through in 94 LBC\n\n[Chorus: Snoop Dogg]\nY'alls niggas betta recognize\nFocus your eyes 'cause my homie's high\nY'alls niggas betta recognize\nE-E-E-E-Eastside\n\n[Verse 4: Trip Locc & (Wayniac)]\nNow you know the game and the game's complete\n(Why's that?) 'Cause the Twinz are bringing nothing but heat\nAnd ya know you didn't wanna see the Cavi flow\n(What kinda flow?) The kinda flow that'll make you slow ya roll (ahh)\n\n[Warren G]\nSo open your eyes and pay attention\nIts two of my homies on a muthafuckin' mission\n\n[Twinz]\nAnd I, kicks up dust 'cause it's a must\nAnd I, acts a fool 'cause it's my rule\nSo need we say more on this topic\nWarren G dropped it\nPut it on track and we locked it\nNigga, did I rock it?\nNigga, did I rock it?\n\n[Warren G]\nIt really doesn't matter 'cause its still on and poppin'\n\n[Chorus: Snoop Dogg] x2\nY'alls niggas betta recognize\nFocus your eyes cuz my homie's high\nY'alls niggas betta recognize\nE-E-E-E-Eastside",
        "type": "track"
    }
]

export const Queue = ({ tracks: tr, onClose }: QueueProps) => {

    return (
        <Modal className={styles.modal} onClose={onClose} title='Queue'>
            <div className={styles.queue}>
                <section className={styles.queueSection}>
                    <h4 className={styles.queueSubtitle}>Playing now</h4>
                    <QueueTrackRow track={tracks[0]} />
                </section>
                <section className={styles.queueSection}>
                    <h4 className={styles.queueSubtitle}>Next</h4>
                    {tracks.slice(1).map((t, i) => <QueueTrackRow track={t} key={t.id} />)}
                </section>
            </div>
        </Modal>
    )
}