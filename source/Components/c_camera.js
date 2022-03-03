import { Component, Types } from "ecsy"

class CameraComponent extends Component {}
CameraComponent.schema = {
    threeCamera: {default: null,  type: Types.Ref },
    rotation : {default: null,  type: Types.Ref },
    translation : {default: null,  type: Types.Ref },
    phi : {default: 0,  type: Types.Number },
    theta : {default: 0,  type: Types.Number },
  };

export { CameraComponent }