const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err)
                reject('I could not find that file');
            resolve(data);
        });
    });
};

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file');
            resolve('Random dog image saved to file!');
        });
    });
};

readFilePromise(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent
            .get(`https://dog.ceo/api/breed/${data}/images/random`)
        })
        .then(res => {
            console.log(res.body.message);
            return writeFilePromise('dog-img.txt', res.body.message);
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            console.log(res.body.message);
            fs.writeFile('dog-img.txt', res.body.message, err => {
                console.log('Random dog image saved to file!');
            });
        })
        .catch(err => {
            if (err) return console.log(err.message);
        });
});*/
