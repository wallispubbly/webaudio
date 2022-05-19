const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);



const audioElem = $('audio')[0];

const track = audioContext.createMediaElementSource(audioElem);
// track.connect(gainNode).connect(panner).connect(audioContext.destination);


$('button').on('click', function() {
	if (this.dataset.playing === 'false') {
        audioElem.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElem.pause();
        this.dataset.playing = 'false';
    }
    console.log(this.dataset.playing);
});

$(audioElem).on('ended', ()=> {
	playbutton.dataset.playing = 'false';
});

$('#volume').on('change', (x) => {
    gainNode.gain.value = x.target.value
    console.log("volume change: " + x.target.value);
});

$('#panner').on('change', (x) => {
    console.log("pan change: " + x.target.value);
    panner.pan.value = x.target.value;
});