import SunVoxWrapper from './SunVoxWrapper'

// zsxdcvgbhnjm ,l.;/
// q2w3er5t6y7u i9o0p[=]
const keyNotes: Map<number, number> = new Map([
    [90, 0],
    [83, 1],
    [88, 2],
    [68, 3],
    [67, 4],
    [86, 5],
    [71, 6],
    [66, 7],
    [72, 8],
    [78, 9],
    [74, 10],
    [77, 11],
    [188, 12],
    [76, 13],
    [190, 14],
    [59, 15],
    [191, 16]
]);

export default class KeyboardPlayer {
    private sv: SunVoxWrapper;

    constructor(sv: SunVoxWrapper) {
        this.sv = sv;
    }

    keyDown(event: KeyboardEvent) {
        let note = keyNotes.get(event.which);
        if (note)
            this.sv.playNote(48 + note);
    }

    keyUp() {
        this.sv.stopNote();
    }
}