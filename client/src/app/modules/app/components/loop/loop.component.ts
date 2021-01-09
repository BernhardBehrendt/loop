import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';


const SMALLEST_STEP = .01;

@Component({
    selector: 'app-loop',
    templateUrl: './loop.component.html',
    styleUrls: ['./loop.component.scss']
})
export class LoopComponent implements OnInit {

    @Output() loop: EventEmitter<any> = new EventEmitter();

    @Input() data: any;

    public smallestStep = SMALLEST_STEP;

    public readyToPlay = false;
    public playing = false;
    public audio: HTMLAudioElement;


    public playFrom = 0;
    public playUntil = 0;

    private clock: any;

    public title = 'loop';

    public audioFile: any;
    public file: any;

    constructor() {
        this.audio = new Audio('assets/100bpm.wav');
    }

    ngOnInit() {

        if (!!this.data) {
            console.log(this.data);
            let blob = new Blob([this.data], {type: 'audio/mpeg'});
            this.audio.src = URL.createObjectURL(new File([blob], 'fsdfds.mp3', {type: 'audio/mpeg'}));
            this.start();
        }

        this.registerEventHandlers();
    }

    start() {
        this.playing = true;
        this.audio.currentTime = this.playFrom;

        this.audio.play().then((then) => {
            this.clock = setInterval(this.runClockRoutines.bind(this), 1);
        });


    }

    stop() {
        this.playing = false;
        this.audio.pause();

        clearInterval(this.clock);
    }

    share() {
        console.log(this.file.type);
        this.loop.emit({
            setting: null,
            data: this.file
        });
    }

    private registerEventHandlers() {
        this.audio.addEventListener('canplaythrough', () => {
            this.initializeNewAudio();
        });

        this.audio.addEventListener('ended', () => {
            this.readyToPlay = true;
            this.playing = false;
        });

        this.audio.addEventListener('loadend', () => {
            console.log('dasfdasd');
        });
    }

    public handleFileSelection(event: any) {
        this.stop();
        this.readyToPlay = false;

        this.file = event.currentTarget.files[0];
        // this.audio = new Audio(URL.createObjectURL(this.file));

        this.audio.src = URL.createObjectURL(this.file);

    }

    private initializeNewAudio() {
        if (!this.readyToPlay) {
            console.log(this.audio.duration);
            this.readyToPlay = true;
            this.playUntil = this.audio.duration;
        }
    }

    private runClockRoutines() {
        if (this.playing && this.audio.loop) {
            if (this.audio.currentTime >= this.playUntil) {
                this.audio.currentTime = this.playFrom;
            }
        }
    }

    public resolveLeaks() {
        if (this.playFrom >= this.playUntil) {
            this.playUntil = this.playFrom + SMALLEST_STEP;
        }

        if (this.playUntil <= this.playFrom) {
            this.playFrom = this.playUntil - SMALLEST_STEP;
        }
    }


}
