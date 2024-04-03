const { isValidObjectId } = require("mongoose");

const { BrandModel } = require("./brand");

const createBrand = async (req, res, next) => {
  try {
    const { brandList } = req.body;

    const responseData = await BrandModel.insertMany(brandList);

    res.send({
      success: true,
      message: "Brands Added Successfully",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const updateBrandRes = await BrandModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Brand Updated Successfully",
        data: updateBrandRes?._id,
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

const listOfBrands = async (req, res, next) => {
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

    const listData = await BrandModel.aggregate(pipeline);

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

const getBrand = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const getData = await BrandModel.findById(req.params.id).lean();

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
  createBrand,
  updateBrand,
  listOfBrands,
  getBrand,
};
