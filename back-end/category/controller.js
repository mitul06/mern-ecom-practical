const { isValidObjectId } = require("mongoose");

const { CategoryModel } = require("./category");

const createCategory = async (req, res, next) => {
  try {
    const { categoryList } = req.body;

    const responseData = await CategoryModel.insertMany(categoryList);

    res.send({
      success: true,
      message: "Category Added Successfully",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const updateCategoryRes = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
        data: updateCategoryRes?._id,
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

const listOfCategory = async (req, res, next) => {
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
        description: 1,
        thumbnail: 1,
      },
    });

    const listData = await CategoryModel.aggregate(pipeline);

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

const getCategory = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const getData = await CategoryModel.findById(req.params.id).lean();

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
  createCategory,
  updateCategory,
  listOfCategory,
  getCategory,
};
