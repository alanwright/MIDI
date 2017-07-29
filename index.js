"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const midiHandler_1 = require("./midiHandler");
const nav = require('web-midi-api');
let midiHandler;
run();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let midiAccess = yield nav.requestMIDIAccess({
                sysex: true
            });
            midiHandler = midiHandler_1.createMIDIHandler(midiAccess);
        }
        catch (e) {
            console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
        }
    });
}
console.log('Press any key to exit');
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
