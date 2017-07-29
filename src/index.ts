import { createMIDIHandler } from './midiHandler';

const nav: Navigator = require('web-midi-api');
let midiHandler;
run();

async function run(): Promise<void> {
    try {
        let midiAccess = await nav.requestMIDIAccess({
            sysex: true
        });
        midiHandler = createMIDIHandler(midiAccess);
    } catch(e) {
        console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
    }
}

console.log('Press any key to exit');

process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));