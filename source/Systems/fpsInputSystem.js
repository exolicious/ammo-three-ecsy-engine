import { System } from "ecsy"
import { CameraComponent } from "../Components/c_camera"
import { InputControllerComponent } from "../Components/c_inputController"
import { Quaternion, Vector3 } from "three"

class FPSInputSystem extends System {
  init() {
    this.previous = {
            leftButton: false,
            rightButton: false,
            mouseX: 0,
            mouseY: 0,
            mouseXDelta: 0,
            mouseYDelta: 0
    }
  }

  execute(delta) {
    this.queries.entities.results.forEach((fpsCameraEntity) => {
      const inputControllerComponent = fpsCameraEntity.getComponent(InputControllerComponent);
      const cameraComponent = fpsCameraEntity.getMutableComponent(CameraComponent);
    
      let current = {...inputControllerComponent.current} 

      let mouseXDelta = current.mouseX - this.previous.mouseX;
      let mouseYDelta = current.mouseY - this.previous.mouseY;

      const xh = mouseXDelta / window.innerWidth;
      const yh = mouseYDelta / window.innerHeight;
      
      cameraComponent.phi += -xh * 5,
      cameraComponent.theta = this.clamp(cameraComponent.theta + -yh *5, -Math.PI / 3, Math.PI / 3);

      const qx = new Quaternion();
      qx.setFromAxisAngle(new Vector3(0, 1, 0), cameraComponent.phi);
      const qz = new Quaternion();
      qz.setFromAxisAngle(new Vector3(1, 0, 0), cameraComponent.theta);

      const q = new Quaternion();
      q.multiply(qx);
      q.multiply(qz);

      cameraComponent.threeCamera.quaternion.copy(q);

      this.previous = {...current};
    })
  }
  
  clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
  }
}
  
FPSInputSystem.queries = {
  entities: {
      components: [CameraComponent, InputControllerComponent],
  },
}

export { FPSInputSystem }