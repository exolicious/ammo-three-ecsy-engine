import { System } from "ecsy"
import { RigidBodyComponent } from "../Components/c_rigidBody";

class RotationSystem extends System {
    execute(delta) {
      this.queries.entities.results.forEach((entityWithRigidBodyComponent) => {
        let rigidBodyObject = entityWithRigidBodyComponent.getComponent(RigidBodyComponent).ref;
        if(!rigidBodyObject.hasMoved) {
          let foceVec = new Ammo.btVector3(3,0,0);
          rigidBodyObject.body.applyImpulse(foceVec, new Ammo.btVector3(5,5,0));
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