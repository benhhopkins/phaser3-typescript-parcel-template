import SunVoxLoader from './SunVoxLoader'

function status(s: string) {
    var statusElement = document.getElementById("status");
    if (statusElement)
        statusElement.innerHTML = s; console.log(s);
}

var mod: integer = 0;
var sv = SunVoxLoader;

export default class SunVoxWrapper {

    constructor() {
        sv.svlib.then(this.loaded);
    }

    loaded(Module) {
        //
        // SunVox Library was successfully loaded.
        // Here we can perform some initialization:
        //
        status("SunVoxLib loading is complete");
        var ver = sv.sv_init(0, 44100, 2, 0); //Global sound system init
        if (ver >= 0) {
            status("init ok");
        }
        else {
            status("init error");
            return;
        }
        sv.sv_open_slot(0); //Open sound slot 0 for SunVox; you can use several slots simultaneously (each slot with its own SunVox engine)
        //
        // Try to load some module (instrument):
        //
        status("loading test song...");
        var req = new XMLHttpRequest();
        req.open("GET", "music/flute.xi", true);
        req.responseType = "arraybuffer";

        req.onload = function (e) {
            if (this.status != 200) {
                status("file not found");
                return;
            }
            var arrayBuffer = this.response;
            if (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);
                sv.sv_lock_slot(0);
                mod = sv.sv_new_module(0, "Sampler", "Sampler", 0, 0, 0);
                sv.sv_unlock_slot(0);
                if (mod > 0) {
                    var fileSize = byteArray.byteLength;
                    sv.sv_lock_slot(0);
                    sv.sv_connect_module(0, mod, 0);
                    sv.sv_unlock_slot(0);
                    sv.sv_sampler_load_from_memory(0, mod, byteArray, -1);
                    status("module (instrument) loaded");
                }
                else {
                    status("module load error");
                }
            }
        };
        req.send(null);
    }

    playNote(note: number) {
        sv.sv_send_event(0, 0, note, 128, mod + 1, 0, 0);
    }

    stopNote() {
        sv.sv_send_event(0, 0, SunVoxLoader.NOTECMD_NOTE_OFF, 0, 0, 0, 0);
    }
}