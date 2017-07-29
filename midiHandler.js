"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMIDIHandler(midi) {
    return new MIDIHandler(midi);
}
exports.createMIDIHandler = createMIDIHandler;
class MIDIHandler {
    constructor(midi) {
        this.midi = midi;
        this.initialize();
    }
    initialize() {
        this.listenOnInputMIDIMessage();
        this.listenOnStateChange();
    }
    listenOnInputMIDIMessage() {
        let inputs = this.midi.inputs.values();
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            let midiInput = input.value;
            midiInput.onmidimessage = (e) => this.onMIDIMessage(e);
            console.log("Input port : [ type:'" + midiInput.type + "' id: '" + midiInput.id +
                "' manufacturer: '" + midiInput.manufacturer + "' name: '" + midiInput.name +
                "' version: '" + midiInput.version + "']");
        }
    }
    listenOnStateChange() {
        this.midi.onstatechange = (e) => this.onStateChange(e);
    }
    onStateChange(event) {
        console.log('state change!');
        let port = event.port, state = port.state, name = port.name, type = port.type;
        if (type == "input")
            console.log("name", name, "port", port, "state", state);
    }
    onMIDIMessage(event) {
        console.log('MIDI message!');
        let data = event.data, cmd = data[0] >> 4, channel = data[0] & 0xf, type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
        note = data[1], velocity = data[2];
        // with pressure and tilt off
        // note off: 128, cmd: 8 
        // note on: 144, cmd: 9
        // pressure / tilt on
        // pressure: 176, cmd 11: 
        // bend: 224, cmd: 14
        switch (type) {
            case 144:// noteOn message 
                console.log('noteOn');
                break;
            case 128:// noteOff message 
                console.log('noteOff');
                break;
        }
        console.log('data', data, 'cmd', cmd, 'channel', channel);
    }
}
