import { createMIDIHandler, IMIDIHandler } from './midiHandler';

const nav: Navigator = require('../libs/web-midi-api/index');

let midiHandler: IMIDIHandler;
nav.requestMIDIAccess({
    sysex: true
}).then((midiAccess) => {
    midiHandler = createMIDIHandler(midiAccess);
}, (e) => {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
});

console.log('Press any key to exit');
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));