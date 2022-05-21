import { RigidBodyCube } from "./rigidBodyCube";
import { FPSCameraAndController } from "./fpsCameraAndController";

class Player {
    constructor(camera, startPos = {x: 0, y: 0, z: 0}) {
        this.rigidBody = new RigidBodyCube(startPos);
        this.fpsCamAndController = new FPSCameraAndController(camera);
    }
}

export { Player }