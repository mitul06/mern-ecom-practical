const { isValidObjectId } = require("mongoose");

const { ProductModel } = require("./product");

const createProduct = async (req, res, next) => {
  try {
    const { productList } = req.body;

    if (productList?.length > 0) {
      if (productList?.some((product) => !product.brand)) {
        throw new Error("Please add first brand");
      }

      if (productList?.some((product) => !product.category)) {
        throw new Error("Please add first category");
      }
    } else {
      throw new Error("Product list is empty");
    }

    const responseData = await ProductModel.insertMany(productList);

    res.send({
      success: true,
      message: "Products Added Successfully",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const updateProductRes = await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        data: updateProductRes?._id,
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

const listOfProducts = async (req, res, next) => {
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

    pipeline.push({
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
        pipeline: [
          {
            $project: {
              title: 1,
            },
          },
        ],
      },
    });

    pipeline.push({
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline: [
          {
            $project: {
              title: 1,
            },
          },
        ],
      },
    });

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
      $project: {
        title: 1,
        brand: { $arrayElemAt: ["$brand", 0] },
        category: { $arrayElemAt: ["$category", 0] },
        stock: 1,
        description: 1,
        price: 1,
        rating: 1,
        images: 1,
        thumbnail: 1,
      },
    });

    const listData = await ProductModel.aggregate(pipeline);

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

const getProduct = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const getData = await ProductModel.findById(req.params.id)
        .populate("brand", ["title"])
        .populate("category", ["title"])
        .lean();

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
  createProduct,
  updateProduct,
  listOfProducts,
  getProduct,
};
