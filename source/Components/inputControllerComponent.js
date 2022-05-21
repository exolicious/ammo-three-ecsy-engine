import { Component, Types } from "ecsy"


class InputControllerComponent extends Component {
}
InputControllerComponent.schema = {
    leftButton: {default: false,  type: Types.Boolean },
    rightButton: {default: false,  type: Types.Boolean },
    mouseXMovement: {default: 0,  type: Types.Number },
    mouseYMovement: {default: 0,  type: Types.Number },
};

export { InputControllerComponent }