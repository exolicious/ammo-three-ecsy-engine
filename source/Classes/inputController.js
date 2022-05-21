class InputController {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.current = {
            leftButton: false,
            rightButton: false,
            mouseX: 0,
            mouseY: 0
        };
        this.previous = null;
        this.keys = {};
        this.previousKeys = {};

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
        this.current.mouseY = event.pageY - window.innerHeigt / 2;
        
        if(this.previous === null)
            this.previous = {...this.current};
        
        this.current.mouseXDelta = this.current.mouseX - this.previous.mouseX;
        this.current.mouseYDelta = this.current.mouseY - this.previous.mouseY;
        
    }

    onKeyDown(event) {
        this.keys[event.keyCode] = true;
    }

    onKeyUp(event) {
        this.keys[event.keyCode] = false;
    }

    update() {
        this.previous = {...this.current};
    }

}

export {InputController}