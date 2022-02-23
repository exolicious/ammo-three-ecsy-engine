import { TagComponent, Types } from "ecsy"


class RigidBodyComponent extends TagComponent {}
RigidBodyComponent.schema = {
    ref: {default: null,  type: Types.Ref },
  };

export { RigidBodyComponent }