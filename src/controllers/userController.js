import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    console.log("req-body:", req.body);
    console.log("req-query:", req.query);
    console.log("req-params:", req.params);

    throw new Error('test error')
    // res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: "POST from Controller: API created new user" });
  } catch (error) {
    next(error)
    // resizeBy.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message,
    // });
  }
};

export const userController = {
  createNew,
};
