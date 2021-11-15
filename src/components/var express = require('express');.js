var express = require('express');
var router = express.Router();
var unirest = require("unirest");
const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://www.flashscore.com/basketball/';
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb+srv://nbauser:nbauserpwd@cluster0.6zsre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Nbfootball1",
    database: "nbahue"
});





setInterval(() => {puppeteer
    .launch()
    .then(async browser => {
        //opening a new page and navigating to Fleshscore
        const page = await browser.newPage();
        await page.goto('https://www.flashscore.com/basketball');
        await page.waitForSelector('body');
        await page.exposeFunction('newScore', s => console.log(s));
        //manipulating the page's content
        let grabMatches = await page.evaluate(() => {
            let allLiveMatches = document.body.querySelectorAll('.event__match');
            //storing the post items in an array then selecting for retrieving content
            scrapeItems = [];
            teams = [
                'Atlanta Hawks',
                'Boston Celtics',
                'Brooklyn Nets',
                'Charlotte Hornets',
                'Chicago Bulls',
                'Cleveland Cavaliers',
                'Dallas Mavericks',
                'Denver Nuggets',
                'Detroit Pistons',
                'Golden State Warriors',
                'Houston Rockets',
                'Indiana Pacers',
                'Los Angeles Clippers',
                'Los Angeles Lakers',
                'Memphis Grizzlies',
                'Miami Heat',
                'Milwaukee Bucks',
                'Minnesota Timberwolves',
                'New Orleans Pelicans',
                'New York Knicks',
                'Oklahoma City Thunder',
                'Orlando Magic',
                'Philadelphia 76ers',
                'Phoenix Suns',
                'Portland Trail Blazers',
                'Sacramento Kings',
                'San Antonio Spurs',
                'Toronto Raptors',
                'Utah Jazz',
                'Washington Wizards',
            ]
            allLiveMatches.forEach(item => {
                let postDescription = '';
                try {
                    let homeTeam = item.querySelector('.event__participant--home').innerText;
                    let awayTeam = item.querySelector('.event__participant--away').innerText;
                    let currentHomeScore = item.querySelector('.event__score--home').innerText;
                    let currentAwayScore = item.querySelector('.event__score--away').innerText;
                    let gameTime = item.querySelector('.event__stage--block').innerText;
                    if (teams.includes(homeTeam) && (gameTime.includes("Quarter") || gameTime.includes("Half Time"))) {
                        scrapeItems.push({
                            homeTeam: homeTeam,
                            awayTeam: awayTeam,
                            homeScore: currentHomeScore,
                            awayScore: currentAwayScore,
                            gameTime: gameTime,
                            timeStamp: Date.now()
                        });
                    }

                } catch (err) { console.log(err) }

            });
            return scrapeItems;
        });
        //outputting the scraped data

        // setTimeout(() => {
        // }, 10000)
        // console.log(grabMatches);
        // console.log(grabMatches)
        // con.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //     for (const index in grabMatches) {
        //         var sql = `INSERT INTO \`live-games\` (home_team, away_team, home_score, away_score) VALUES ("${grabMatches[index].homeTeam}", "${grabMatches[index].awayTeam}", ${grabMatches[index].homeScore}, ${grabMatches[index].awayScore})`;
        //         con.query(sql, function (err, result) {
        //           if (err) throw err;
        //           console.log("inserted game into table");
        //         });
        //     }
        //   });
        console.log(grabMatches)
        MongoClient.connect(dburl, function(err, db) {
            if (err) throw err;
            var dbo = db.db("nba_games");
            for (const match in grabMatches) {
                dbo.collection("live_games").insertOne(grabMatches[match], function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                });
            }
            db.close();
          });
        //closing the browser
        await browser.close();
    })
    //handling any errors
    .catch(function (err) {
        console.error(err);
    });

}, 3000);





module.exports = router;