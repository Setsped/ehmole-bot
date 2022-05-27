const fs = require('fs');
const writeStream = fs.createWriteStream('file.txt');
const ytpl = require('ytpl');
const FileSystem = require("fs");
const jason = require("./Undergrounds.json");

const playlistFinder = async () => {


    let playlistResult = await ytpl("https://www.youtube.com/playlist?list=PLI_TwOrHUsI8MQNW0BvBAwwHYKgyiiiDB")
    const pathName = writeStream.path;
    let array = ['1','2','3','4','5','6','7'];
    console.log(jason.cache)

    /*FileSystem.writeFile('file.json', JSON.stringify(playlistResult), (error) => {
    if (error) throw error;
  });
  
/* write each value of the array on the file breaking line
playlistResult.forEach(value => writeStream.write(`${value}\n`));


// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
   console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

// close the stream
writeStream.end();*/
}

playlistFinder()