import { System } from "ecsy"

class SimulatePhysicsSystem extends System {

    execute(delta, elapsedTime) {
        window.mobaWorld.physicsWorld.stepSimulation(delta, 10);
    }
}
  
export { SimulatePhysicsSystem }