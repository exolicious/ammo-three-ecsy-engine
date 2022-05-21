import { System } from "ecsy"
import { RigidBodyComponent } from "../Components/rigidBodyComponent"
import { Vector3, Quaternion } from "three"

class SynchronizePhysicsSystem extends System {
    execute(delta) {
      this.queries.entities.results.forEach((entityWithRigidBodyComponent) => {
        let rigidBodyObject = entityWithRigidBodyComponent.getComponent(RigidBodyComponent).ref
        let object3D = entityWithRigidBodyComponent.getObject3D();
        let tmpTransform = new Ammo.btTransform();

        rigidBodyObject.motionState.getWorldTransform(tmpTransform);
        const pos = tmpTransform.getOrigin();
        const quat = tmpTransform.getRotation();
        const pos3 = new Vector3(pos.x(), pos.y(), pos.z());
        const quat3 = new Quaternion(quat.x(), quat.y(), quat.z(), quat.w());

        object3D.position.copy(pos3);
        object3D.quaternion.copy(quat3);

      }); 
    }
  }
  
SynchronizePhysicsSystem.queries = {
  entities: {
      components: [RigidBodyComponent],
  },
};

export { SynchronizePhysicsSystem }