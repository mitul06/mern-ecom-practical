const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("mongodb");

const { OrderModel } = require("./order");

const createOrder = async (req, res, next) => {
  try {
    const responseData = await OrderModel.create(req.body);

    res.send({
      success: true,
      message: "Order Added Successfully",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const updateOrderRes = await OrderModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Order Updated Successfully",
        data: updateOrderRes?._id,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid Id",
      });
    }
  } catch (error) {
    next(error);
  }
};

const listOfOrders = async (req, res, next) => {
  try {
    let pipeline = [];

    let limit = 10;
    let skip = 0;
    let isNext = false;
    let sortType = req.query.sortType == "desc" ? -1 : 1;
    let sort = req.query.sort;
    let search = req.query.search;

    let filter = {};

    if (req.query.limit) {
      limit = Number(req.query.limit) + 1;
    }

    if (req.query.skip) {
      skip = Number(req.query.skip);
    }

    if (req.query.userId) {
      filter = {
        ...filter,
        userId: new ObjectId(req.query.userId),
      };
    }

    if (search) {
      filter = {
        ...filter,
        $or: [
          {
            title: { $regex: new RegExp(search, "gi") },
          },
        ],
      };
    }

    pipeline.push(
      {
        $match: filter,
      },
      { $limit: limit },
      { $skip: skip },
      {
        $sort: { [sort]: sortType, _id: 1 },
      }
    );

    pipeline.push({
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      },
    });

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userId",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              email: 1,
            },
          },
        ],
      },
    });

    pipeline.push({
      $project: {
        products: 1,
        price: 1,
        userId: { $arrayElemAt: ["$userId", 0] },
        status: 1,
        totalQuantity: 1,
        createdAt: 1,
      },
    });

    const listData = await OrderModel.aggregate(pipeline);

    if (listData.length === limit) {
      isNext = true;
      listData.pop();
    }

    res.status(200).send({
      success: true,
      isNext,
      data: listData,
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const getData = await OrderModel.findById(req.params.id).lean();

      res.status(200).send({
        success: true,
        data: getData,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid Id",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  listOfOrders,
  getOrder,
};
