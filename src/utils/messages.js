exports.generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

exports.generateLocation = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};
