const bcrypt = require("bcrypt");
const passport = require("passport");

const { UserModel } = require("../users/user");

const register = async (req, res, next) => {
  try {
    if (req.body) {
      const salt = await bcrypt.genSalt(10);
      const cryptPass = await bcrypt.hash(req.body.password, salt);

      const userData = {
        ...req.body,
        password: cryptPass,
      };

      const userReg = await UserModel.create(userData);

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        data: userReg,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "missing some fields",
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    passport.authenticate("local", (error, user, other) => {
      if (error) {
        res.status(500).send({
          success: false,
          message: error.message,
        });
      } else {
        if (user) {
          req.login(user, async (error) => {
            if (error) {
              res.status(500).send({
                success: false,
                message: error,
              });
            }
            const userData = await UserModel.findById(user._id)
              .select("-password")
              .lean();

            res.status(200).send({
              success: true,
              message: "Login Successfully",
              data: userData,
            });
          });
        } else {
          res.status(404).send({
            success: false,
            message: other.message,
          });
        }
      }
    })(req, res);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    req.logout(req.user, async (error) => {
      if (error) throw error;

      req.session.destroy((err) => {
        if (err) console.log(err);
        else console.log("session was destroy");
      });

      res.status(200).send({
        success: true,
        message: "Logout Successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.user._id)
      .select("-password")
      .lean();

    const loggedData = {
      ...userData,
    };

    res.status(200).send({
      success: true,
      message: "You are log in",
      data: loggedData,
    });
  } catch (error) {
    console.log("error in islogin", error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

module.exports = {
  register,
  login,
  isLoggedIn,
  logout,
};
