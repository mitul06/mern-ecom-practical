const { isValidObjectId, get } = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const { UserModel } = require("./user");

const createUser = async (req, res, next) => {
  try {
    const roleNames = await RoleModel.findOne({ roleName: "admin" });

    const haveAdmin = await UserModel.findOne({
      role: new ObjectId(roleNames._id),
    });

    const genSalt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash("Funneline@1234", genSalt);

    const data = {
      ...req.body,
      password: cryptedPassword,
    };

    const responseData = await UserModel.create(data);

    res.send({
      success: true,
      message: "User Create Successfully",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Data Updated Successfully",
        data: updatedUser?._id,
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

const changePasswordUser = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const selectedUser = await UserModel.findById(req.params.id);
      let currentPassword = req.body.currentPassword;
      let newPassword = req.body.newPassword;

      const isMatch = await bcrypt.compare(
        currentPassword,
        selectedUser?.password
      );

      if (isMatch) {
        const genSalt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(newPassword, genSalt);

        await UserModel.updateOne(
          { _id: new ObjectId(selectedUser?._id) },
          { $set: { password: cryptedPassword } },
          { new: true }
        );

        res.status(200).send({
          success: true,
          message: "Password Changed Successfully",
          data: selectedUser._id,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Currnent password doesn't match",
        });
      }
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

const userList = async (req, res, next) => {
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
            firstName: { $regex: new RegExp(search, "gi") },
          },
          {
            email: { $regex: new RegExp(search, "gi") },
          },
          {
            mobile: { $regex: new RegExp(search, "gi") },
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
        firstName: 1,
        lastName: 1,
        email: 1,
        mobile: 1,
      },
    });

    const listData = await UserModel.aggregate(pipeline);

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

const getUser = async (req, res, next) => {
  try {
    const isValid = isValidObjectId(req.params.id);

    if (isValid) {
      const getData = await UserModel.findById(req.params.id)
        .select("-password")
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
  updateUser,
  changePasswordUser,
  createUser,
  userList,
  getUser,
};
