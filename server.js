

const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 5000;

const news = [];


const newsPapers =[{
  name:'juggler',
  address:'https://en.wikinews.org/wiki/Wikinews_interviews_noted_juggler_for_International_Jugglers_Day',
  base:"https://en.wikinews.org"

},
{
  name:'Latest News',
  address:'https://en.wikinews.org/wiki/Template:Latest_news',
  base:"https://en.wikinews.org"
},
{
  name:'Introduction',
  address:'https://en.wikinews.org/wiki/Wikinews:Introduction',
  base:"https://en.wikinews.org"
},
{
  name:'Main_Page',
  address:'https://en.wikinews.org/w/index.php?title=Main_Page&oldid=4568285%22',
  base:"https://en.wikinews.org"
},
{
  name:'Water_cooler',
  address:'https://en.wikinews.org/wiki/Wikinews:Water_cooler',
  base:"https://en.wikinews.org"
},
{
  name:'Breaking News',
  address:'https://en.wikinews.org/wiki/Wikinews:Breaking_news',
  base:"https://en.wikinews.org"
},
{
  name:'wikinews',
  address:'https://en.wikipedia.org/wiki/Wikinews',
  base:"https://en.wikinews.org"
},
{
  name:'featred articles',
  address:'https://en.wikinews.org/wiki/Wikinews:Featured_articles',
  base:"https://en.wikinews.org"
},
{
  name:'AudioWikinews',
  address:'https://en.wikinews.org/wiki/Wikinews:Audio_Wikinews',
  base:"https://en.wikinews.org"
}
]
app.get('/', (req, res) => {
  res.send("this is a home page");
});



newsPapers.forEach(newsPaper=>{
  axios.get(newsPaper.address)
  .then(response=>{
    const html = response.data;
    const $ = cheerio.load(html)
    $('a:contains("news")',html).each(function(){
      const title=$(this).text()
      const url = $(this).attr('href')

      news.push({
        title,
        url:newsPaper.base+url,
        source: newsPaper.name
      })
    })
  })
})



app.get('/:newsPapersId',async(req,res)=>{
  const newsPapersId = req.params.newsPapersId
  const newsPaperAddress= newsPapers.filter(newsPaper=>newsPaper.name == newsPapersId)[0].address;


  axios.get(newsPaperAddress)
  .then(response=>{
    const html = response.data
    const $= cheerio.load(html)
    const constSpecificNews=[]

    $('a:contains("news")',html).each(function(){
      const title=$(this).text()
      const url = $(this).attr('href')
      constSpecificNews.push({
        title,
        url:newsPaperAddress
      })
    })
    res.json(constSpecificNews)
  }).catch(err=>console.log(err))
})


app.listen(PORT, console.log(`server listening on port ${PORT}`));