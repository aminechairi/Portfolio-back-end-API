module.exports = errorObject = (value, msg, path, location) => {
  return {
    type: "field",
    value: value,
    msg: msg,
    path: path,
    location: location,
  };
};