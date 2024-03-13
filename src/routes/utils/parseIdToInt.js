// Função middleware para validar e converter o ID do usuário
export function parseReqId(paramName) {
  return function (req, res, next) {
    const idString = req.params[paramName];

    const parsedId = Number.parseInt(idString);

    if (!isNaN(parsedId)) {
      req.params[paramName] = parsedId;
      next();
    } else {
      return res.status(400).json({ message: `Invalid ${paramName} ID` });
    }
  };
}
