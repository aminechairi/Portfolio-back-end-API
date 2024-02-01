const userRoutes = require("./userRoute");

const mountRoutes = (app) => {
  app.use(`/api/v1/user`, userRoutes);
};

module.exports = mountRoutes;