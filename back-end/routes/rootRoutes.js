const express = require("express");
const { authRoutes } = require("../auth/routes");
const { productRouter } = require("../products/router");
const { brandRouter } = require("../brand/router");
const { categoryRouter } = require("../category/router");
const { orderRouter } = require("../order/router");
const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/product", productRouter);
rootRouter.use("/brand", brandRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/order", orderRouter);

module.exports = { rootRouter };
