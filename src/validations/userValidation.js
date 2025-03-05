import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(2).max(10).trim().strict(),
    password: Joi.string().required().min(8).max(20).trim().strict(),
  });

  try {
    

    await correctCondition.validateAsync(req.body,{abortEarly:false}) 
    next()
    
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const userValidation = {
  createNew,
};
