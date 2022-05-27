const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const audioPaths = [
    "audio/tap.mp3",
    "audio/whip.mp3"
];
let promises = [];


// utility function to load an audio file and resolve it as a decoded audio buffer
function getBuffer(url, audioCtx) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject("Missing url!");
            return;
        }

        if (!audioCtx) {
            reject("Missing audio context!");
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";

        console.log(this);
        xhr.onload = function() {
            console.log(this);
            let arrayBuffer = xhr.response;
            audioCtx.decodeAudioData(arrayBuffer, decodedBuffer => {
                resolve(decodedBuffer);
            });
        };

        xhr.onerror = function() {
            reject("An error occurred.");
        };

        xhr.send();
    });
}


audioPaths.forEach(p => {
    promises.push(getBuffer(p, ctx));
});


$("#b1").on('click', function() {
    // Once all your sounds are loaded, create an AudioBufferSource for each one and start sound
    Promise.all(promises).then(buffers => {
        buffers.forEach(b => {
            console.log(b);
            let source = ctx.createBufferSource();
            source.buffer = b;
            source.connect(ctx.destination);
            source.onended = function() {
                console.log("ended");
            }
            source.start();
            console.log(source);
        })
    });
});

// $('#b1').on('click', function(){
//     Promise.resolve(promises[0]).then(x => {
//         console.log(x);
//         let source = ctx.createBufferSource();
//         console.log(source);
//         source.buffer = x;
//         source.connect(ctx.destination);
//         source.start();
//     });
// });

// $('#b2').on('click', function(){
//     Promise.resolve(promises[1]).then(x => {
//         let source = ctx.createBufferSource();
//         source.buffer = x;
//         source.connect(ctx.destination);
//         source.start();
//     });
// });

console.log("done");