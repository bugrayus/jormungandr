interface RoleState {
  role: string;
}

const initialState: RoleState = {
  role: "",
};

const roleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;

export type { RoleState };
