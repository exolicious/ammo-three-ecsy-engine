import { System } from "ecsy"
import { RigidBodyComponent } from "../Components/c_rigidBody";

class RotationSystem extends System {
    execute(delta) {
      this.queries.entities.results.forEach((entityWithRigidBodyComponent) => {
        let rigidBodyObject = entityWithRigidBodyComponent.getComponent(RigidBodyComponent).ref;
        console.log(rigidBodyObject);
        
        let foceVec = new Ammo.btVector3(0,0,0);
        rigidBodyObject.body.applyCentralImpulse(foceVec);

      })
    }
  }
  
RotationSystem.queries = {
  entities: {
      components: [RigidBodyComponent],
  },
}

export { RotationSystem }