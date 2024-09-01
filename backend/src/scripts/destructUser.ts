const destructUser = (obj: any) => {
  const { password, ...rest } = obj;
  return rest;
};

export default destructUser;
