const fs = require('fs');
const fs2 = require('fs/promises');


console.log("starting");
// method 1 (synchronously)
fs.appendFileSync("k.txt", "initial mes")
console.log("file created");


const data = fs.readFileSync('k.txt', "utf8");
console.log(data);

// method 2 (Asynchronously)
fs.readFile('k.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("file currupted");
    }
    else {
        console.log("data => ", data);
    }
})

// method 3 (promise)
async function readFile() {
    try {
        const data = await fs2.readFile("k.txt", 'utf8');
        console.log("data => ", data);
    } catch (err) {
        console.log('error read file : ', err);
    }
}

readFile();

fs.writeFile("k.txt", "This is writing", (err) => {
    if (err) throw err;
    console.log("file saved");
});

fs.appendFile("k.txt", "\n Appended text", (err) => {
    if (err) throw err;
    console.log("file appended");
})

setTimeout(() => {
    fs.unlink('k.txt', (err) => {
        if (err) throw err;
        console.log("file deleted");
    })
}, 1000);

fs.mkdir("new folder", { recursive: true }, (err) => {
    if (err) throw err;
})