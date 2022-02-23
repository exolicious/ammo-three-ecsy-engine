import { Rotating } from "../Components/c_rotating"
import { Cube } from "./cube"

class RotatingCube extends Cube {
    constructor(size=1) {
        super(size);
        this.decorateWithRotatingComponent();
    }
    decorateWithRotatingComponent() {
        this.entity.addComponent(Rotating)
        //add more Components
    }
}

export { RotatingCube }