import { System } from "ecsy"
import { CameraComponent } from "../Components/cameraComponent"
import { InputControllerComponent } from "../Components/inputControllerComponent"
import { AnimationBlendMode, Quaternion, Vector3 } from "three"
import { RigidBodyComponent } from "../Components/rigidBodyComponent";

const accelaration = 10;

class FPSInputSystem extends System {
  execute(delta) {
    this.queries.fpsCameras.results.forEach((fpsCameraEntity) => {
      const inputControllerComponent = fpsCameraEntity.getMutableComponent(InputControllerComponent);
      const cameraComponent = fpsCameraEntity.getMutableComponent(CameraComponent);
      
      //mouse
      const xh = inputControllerComponent.mouseXMovement / window.innerWidth;
      const yh = inputControllerComponent.mouseYMovement / window.innerHeight;
      
      cameraComponent.phi += -xh * 5,
      cameraComponent.theta = this.clamp(cameraComponent.theta + -yh * 5, -Math.PI / 2, Math.PI / 2);

      const qx = new Quaternion();
      qx.setFromAxisAngle(new Vector3(0, 1, 0), cameraComponent.phi);
      const qz = new Quaternion();
      qz.setFromAxisAngle(new Vector3(1, 0, 0), cameraComponent.theta);

      const q = new Quaternion();
      q.multiply(qx);
      q.multiply(qz);

      cameraComponent.threeCamera.quaternion.copy(q);

      inputControllerComponent.mouseXMovement = 0;
      inputControllerComponent.mouseYMovement = 0;

      //keys
      
      if(inputControllerComponent.keys["w"]) {
        this.forward = true;
      }
    });

    this.queries.fpsRigidBodies.results.forEach((fpsRigidBody) => {
      let rigidBodyComponent = fpsRigidBody.getComponent(RigidBodyComponent);
      if(this.forward) {
        console.log(rigidBodyComponent.ref);
        console.log("moving forward");
        let forceVec = new Ammo.bt3Vector(0,10,10);
        rigidBodyComponent.ref.body.applyCentralImpule(forceVec);
      }
      this.forward = false;
    });
  }
  
  clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
  }

}

FPSInputSystem.queries = {
  fpsCameras: {
    components: [CameraComponent, InputControllerComponent],
  },
  fpsRigidBodies: {
    components: [RigidBodyComponent],
  }
}

export { FPSInputSystem }