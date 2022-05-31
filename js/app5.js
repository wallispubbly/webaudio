const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
const audioPaths = [
    "audio/tap.mp3",
    "audio/whip.mp3"
];
let promises = [];


// utility function to load an audio file and resolve it as a decoded audio buffer
function getBuffer(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";

        xhr.onload = function() {
            let arrayBuffer = xhr.response;
            // audioCtx.decodeAudioData(arrayBuffer, decodedBuffer => {
            //     resolve(decodedBuffer);
            // });
            resolve(arrayBuffer);
        };

        xhr.onerror = function() {
            reject("An error occurred.");
        };

        xhr.send();
    });
}

function decodeAudio(buffer) {
    return new Promise((resolve, reject) => {
        ctx.decodeAudioData(buffer, decodedBuffer => {
            resolve(decodedBuffer);
        })
    });
}


function playDecodedAudio(decodedBuffer) {
    console.log(decodedBuffer);
    let source = ctx.createBufferSource();
    source.buffer = decodedBuffer;
    // gainNode.gain.setValueAtTime(0, ctx.currentTime);
    source.connect(ctx.destination);
    source.start(0);
    console.log(source);
}

// audioPaths.forEach(p => {
//     getBuffer(p).then((result) => {
//         console.log(result);
//     });

// });


$("#b1").on('click', function() {
    a = audioPaths[0];
    getBuffer(a).then(function(buffer) {
        console.log(buffer);
        decodeAudio(buffer).then(function(decoded) {
            playDecodedAudio(decoded);
        });
    });
    // promises.push(getBuffer(a));
});

// $('#b2').on('click', function(){
//     console.log(promises[0]);
//     promises[0].then(function(buffer) {
//         console.log(this);
//         decodeAudio(buffer).then(function(decoded) {
//             playDecodedAudio(decoded);
//         });
//     });
// });

$("#b2").on('click', function() {
    ctx.resume();
    ctx.onstatechange = () => console.log(ctx.state);
});

console.log("done");