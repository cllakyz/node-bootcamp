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

const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        const result = await writeFilePromise('dog-img.txt', res.body.message);
        //console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    }
    return '2: READY DOG';
};

(async () => {
    try {
        console.log('1: Will get dog pics!');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pics!');
    } catch (err) {
        console.log('ERROR!');
    }
})();

/*
console.log('1: Will get dog pics!');
getDogPic()
    .then(x => {
        console.log(x);
        console.log('3: Done getting dog pics!');
    })
    .catch(err => {
        console.log('ERROR!');
    });
*/
/*
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
*/


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
