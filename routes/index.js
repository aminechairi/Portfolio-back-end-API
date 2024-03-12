const userRoutes = require("./userRoute");
const socialMediaRoute = require("./socialMediaRoute");

const mountRoutes = (app) => {
  app.use(`/api/v1/user`, userRoutes);
  app.use(`/api/v1/social-media`, socialMediaRoute);  
};

module.exports = mountRoutes;