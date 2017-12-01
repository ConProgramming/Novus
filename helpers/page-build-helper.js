'use strict';
let handlebars = require('handlebars');
let layouts = require('handlebars-layouts');
let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp');

const sampleMessageData = { 
  "1" : {
    "receiver" : "John Doe"
  },
  "2" : {
    "receiver" : "Jimmy Kimmel"
  }
}

/** storage.isPathExists(app.getPath('userData') + '/messages.json')
.then(itDoes => {
  if (itDoes) {
    console.log('pathDoesExists !')
    storage.get(app.getPath('userData') + '/messages.json')
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
  }else{
    console.log('doesnt exist')
    storage.set(app.getPath('userData') + '/messages.json', sampleMessageData)
    .then(() => {
      console.log('The file was successfully written to the storage');
    })
    .catch(err => {
      console.error(err);
    });
  }
  
}); **/

mkdirp.sync(path.join(__dirname, '../pages'));

let input = path.join(__dirname, '../pages-content');
let pageFiles = fs.readdirSync(input);
let output = path.join(__dirname, '../pages');

let layoutPath = path.join(__dirname, '../layouts/layout.hbs');

// Register helpers
handlebars.registerHelper(layouts(handlebars));

// Register partials
handlebars.registerPartial('layout', fs.readFileSync(layoutPath, 'utf8'));

function buildPages(files) {
  files.forEach((file) => {

    let HTMLPath = path.join(__dirname, `../pages-content/${file}`);

    // Compile template
    let template = handlebars.compile(fs.readFileSync(HTMLPath, 'utf8'));

    // Render template
    let render = template({
      title: 'Novus',
    });
    fs.writeFileSync(path.join(output, file), render);
  });
}

buildPages(pageFiles);