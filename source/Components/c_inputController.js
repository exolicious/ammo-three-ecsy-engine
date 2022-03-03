import { Component, Types } from "ecsy"


class InputControllerComponent extends Component {
    constructor() {
        // Pass false to disable using the schema for default values.
        super(false);
        this.initialize();

    }
    initialize() {
        this.current = {
            leftButton: false,
            rightButton: false,
            mouseX: 0,
            mouseY: 0,
            mouseXDelta: 0,
            mouseYDelta: 0
        };
        this.keys = {};

        document.addEventListener("mousedown", (event) => this.onMouseDown(event), false);
        document.addEventListener("mouseup", (event) => this.onMouseUp(event), false);
        document.addEventListener("mousemove", (event) => this.onMouseMove(event), false);
        document.addEventListener("keydown", (event) => this.onKeyDown(event), false);
        document.addEventListener("keyup", (event) => this.onKeyUp(event), false);
    }

    onMouseDown(event) {
        if(event.button === 0) 
            this.current.leftButton = true;
        else if(event.button === 2) 
            this.current.rightButton = true;
    }

    onMouseUp(event) {
        if(event.button === 0) 
            this.current.leftButton = false;
        else if(event.button === 2) 
            this.current.rightButton = false;
    }

    onMouseMove(event) {
        this.current.mouseX = event.pageX - window.innerWidth / 2;
        this.current.mouseY = event.pageY - window.innerHeight / 2;

    }

    onKeyDown(event) {
        this.keys[event.keyCode] = true;
    }

    onKeyUp(event) {
        this.keys[event.keyCode] = false;
    }
}

export { InputControllerComponent }