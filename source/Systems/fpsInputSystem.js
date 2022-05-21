import { System } from "ecsy"
import { CameraComponent } from "../Components/cameraComponent"
import { InputControllerComponent } from "../Components/inputControllerComponent"
import { Quaternion, Vector3 } from "three"

class FPSInputSystem extends System {
  execute(delta) {
    console.log("execute");
    this.queries.fpsCameras.results.forEach((fpsCameraEntity) => {
      const inputControllerComponent = fpsCameraEntity.getMutableComponent(InputControllerComponent);
      const cameraComponent = fpsCameraEntity.getMutableComponent(CameraComponent);

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
}

export { FPSInputSystem }