import { InputControllerComponent } from "../Components/c_inputController"
import { CameraComponent } from "../Components/c_camera"
import { Quaternion, Vector3 } from "three";

class FPSCamera {
    constructor(camera) {
        this.camera = camera;
        this.entity = window.mobaWorld.createEntity();
        this.decorateWithComponents();
    }
    decorateWithComponents() {
        this.entity.addComponent(InputControllerComponent);
        this.entity.addComponent(CameraComponent, { threeCamera: this.camera, rotation: new Quaternion(), translation: new Vector3() });
    }
}

export { FPSCamera }