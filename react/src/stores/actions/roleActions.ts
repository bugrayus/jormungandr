export const set = (role: string) => {
  return {
    type: "SET",
    payload: role,
  };
};
