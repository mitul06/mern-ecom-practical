const errorHandler = (error, req, res, next) => {
  console.log("error ---->", error);

  if (error?.errors) {
    error.message = error?.errors[Object.keys(error.errors)[0]].message;
    error.message = error.message.replace("Path", "");
  }
  const result = {};

  if (error.result && error.message) {
    result.nInserted = error.result?.nInserted;
  }

  let { message } = error;

  if (error.message?.includes("E11000") && error?.code === 11000) {
    if (error.keyValue && Object.keys(error?.keyValue)[0] === "mobile") {
      message = "Please enter a unique mobile number";
    } else if (error?.keyValue) {
      message = `${Object.keys(error.keyValue)[0]} is already exists`;
    } else {
      let m = message
        .substr(message.indexOf("{"), message.length)
        .match(/{.*?}/);
      m = m[0].match(/[a-zA-Z]+/);
      message = `Duplicate entry for ${m[0]} value: ${
        error.writeErrors[0].err.op[m[0]]
      }`;
    }
  }

  const extra = {};

  if (req.clearReceipt) {
    extra.clearReceipt = req.clearReceipt;
  }

  return res?.status(500)?.send({
    success: false,
    message,
    code: error?.code,
    ...result,
    ...extra,
  });
};

module.exports = { errorHandler };
