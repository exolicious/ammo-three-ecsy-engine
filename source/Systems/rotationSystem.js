import { System } from "ecsy"
import { RigidBodyComponent } from "../Components/rigidBodyComponent";

class RotationSystem extends System {
    execute(delta) {
      this.queries.entities.results.forEach((entityWithRigidBodyComponent) => {
        let rigidBodyObject = entityWithRigidBodyComponent.getComponent(RigidBodyComponent).ref;
        if(!rigidBodyObject.hasMoved) {
          let forceVec = new Ammo.btVector3(3,0,0);
          rigidBodyObject.body.applyImpulse(forceVec, new Ammo.btVector3(5,5,0));
          rigidBodyObject.hasMoved = true;
        }
      })
    }
  }
  
RotationSystem.queries = {
  entities: {
      components: [RigidBodyComponent],
  },
}

export { RotationSystem }