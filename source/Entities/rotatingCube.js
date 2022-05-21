import { Rotating } from "../Components/rotatingComponent"
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