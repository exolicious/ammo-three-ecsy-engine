import { InputControllerComponent } from "../Components/inputControllerComponent"
import { CameraComponent } from "../Components/cameraComponent"
import { Quaternion, Vector3 } from "three";

class FPSCameraAndController {
    constructor(camera) {
        this.camera = camera;
        this.entity = window.mobaWorld.createEntity();
        this.decorateWithComponents();

        document.addEventListener("mousedown", (event) => this.onMouseDown(event), false);
        document.addEventListener("mouseup", (event) => this.onMouseUp(event), false);
        document.addEventListener("mousemove", (event) => this.onMouseMove(event), false);
        document.addEventListener("keydown", (event) => this.onKeyDown(event), false);
        document.addEventListener("keyup", (event) => this.onKeyUp(event), false);
    }

    decorateWithComponents() {
        this.entity.addComponent(InputControllerComponent);
        this.inputComponent = this.entity.getMutableComponent(InputControllerComponent);
        console.log(this.inputComponent);
        this.entity.addComponent(CameraComponent, { threeCamera: this.camera, rotation: new Quaternion(), translation: new Vector3() });
    }

    onMouseDown(event) {
        if(event.button === 0) 
            this.inputComponent.leftButton = true;
        else if(event.button === 2) 
            this.inputComponent.rightButton = true;
    }

    onMouseUp(event) {
        if(event.button === 0) 
            this.inputComponent.leftButton = false;
        else if(event.button === 2) 
            this.inputComponent.rightButton = false;
    }

    onMouseMove(event) {
        this.inputComponent.mouseXMovement = event.movementX;
        this.inputComponent.mouseYMovement = event.movementY;
    }

    onKeyDown(event) {
        this.inputComponent.keys[event.key] = true;
    }

    onKeyUp(event) {
        this.inputComponent.keys[event.key] = false;
    }
}

export { FPSCameraAndController }