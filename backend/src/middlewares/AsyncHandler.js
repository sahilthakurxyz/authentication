export const AsyncHandler = (handlerController) => {
  return (req, res, next) => {
    Promise.resolve(handlerController(req, res, next)).catch(next);
  };
};
