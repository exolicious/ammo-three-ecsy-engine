import { Component, Types } from "ecsy"

class CameraComponent extends Component {}
CameraComponent.schema = {
    threeCamera: {type: Types.Ref },
    rotation : {type: Types.Ref },
    translation : {type: Types.Ref },
    phi : {default: 0,  type: Types.Number },
    theta : {default: 0,  type: Types.Number },
  };

export { CameraComponent }