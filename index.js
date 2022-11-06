const fs = require('fs');
const ytdl = require('ytdl-core');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');

const setTitle = require('node-bash-title');
const { format } = require('path');
setTitle('Youtube Downloader');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


const clipboard = clipboardy.readSync();



if(clipboard.startsWith('https://www.youtube.com/'))
{
  setTitle('Youtube Downloader | ' + clipboard);
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'format',
      message: 'Choose Download Format:',
      choices: [
        'Mp4',
        'Mp3'
      ]
    },
  ])
  .then((answers) => {
      if(answers.format == `Mp4`)
      {
        ytdl(clipboard)
        .pipe(fs.createWriteStream(process.cwd() + '/Downloaded/video.mp4'));
        require('child_process').exec(`start "" "` + process.cwd() + `/Downloaded"`);
      }
      else
      {
        ytdl(clipboard, { filter: 'audioonly' })
        .pipe(fs.createWriteStream(process.cwd() + '/Downloaded/audio.mp3'));
        require('child_process').exec(`start "" "` + process.cwd() + `/Downloaded"`);
      }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error);
    }
  });
}
else
{
  readline.question('Youtube Link: ', link => {
    readline.close();
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'format',
        message: 'Choose Download Format:',
        choices: [
          'Mp4',
          'Mp3'
        ]
      },
    ])
    .then((answers) => {
        if(answers.format == `Mp4`)
        {
          ytdl(link)
          .pipe(fs.createWriteStream(process.cwd() + '/Downloaded/video.mp4'));
          require('child_process').exec(`start "" "` + process.cwd() + `/Downloaded"`);
        }
        else
        {
          ytdl(link, { filter: 'audioonly' })
          .pipe(fs.createWriteStream(process.cwd() + '/Downloaded/audio.mp3'));
          require('child_process').exec(`start "" "` + process.cwd() + `/Downloaded"`);
        }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
      }
    });
    
  });
}







  