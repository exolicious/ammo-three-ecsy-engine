import { Cube } from "./cube"
import { RigidBody } from "../Classes/rigidBody"
import { RigidBodyComponent } from "../Components/rigidBodyComponent";
import { Vector3 } from "three"


class RigidBodyCube extends Cube {
    constructor(size = 1) {
        super(size);
        this.initializeRigidBody();
        this.decorateWithRigidBodyComponent();
    }

    initializeRigidBody() {
        let object3D = this.entity.getObject3D();
        object3D.position.set(0,10,0)
        this.rigidBody = new RigidBody();
        this.rigidBody.createBox(1, object3D.position, object3D.quaternion, new Vector3(this.size, this.size, this.size));
        this.rigidBody.setRestitution(0.25);
        this.rigidBody.setFriction(1);
        this.rigidBody.setRollingFriction(5);
        window.mobaWorld.physicsWorld.addRigidBody(this.rigidBody.body);
    }

    decorateWithRigidBodyComponent() {
        this.entity.addComponent(RigidBodyComponent, {ref: this.rigidBody})
    }
}

export { RigidBodyCube }