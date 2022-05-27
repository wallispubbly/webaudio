var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function getDataX() {
  var source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();

  request.open('GET', 'audio/guitar_short.mp3', true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData).then(function(decodedData) {
      source.buffer = decodedData;

      source.connect(audioCtx.destination);
      source.loop = true;
      source.start(0);
    });

  }

  request.send();
}

// function getDataY() {
//   var source = audioCtx.createBufferSource();
//   var request = new XMLHttpRequest();

//   request.open('GET', 'audio/birds_short.mp3', true);

//   request.responseType = 'arraybuffer';

//   request.onload = function() {
//     var audioData = request.response;

//     audioCtx.decodeAudioData(audioData).then(function(decodedData) {
//       source.buffer = decodedData;

//       source.connect(audioCtx.destination);
//       source.loop = true;
//       source.start(0);
//     });

//   }

//   request.send();
// }


// wire up buttons to stop and play audio



$('#b1').on('click', function() {
  getDataX();
});


// $('#b2').on('click', function() {
//   getDataY();
// });



// dump script to pre element

// pre.innerHTML = myScript.innerHTML;