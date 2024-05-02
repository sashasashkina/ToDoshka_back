import bcrypt from "bcrypt";

//import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import * as servicesAuth from "../../services/servicesAuth.js";

import HttpError from "../../helpers/HttpError.js";

import { generateToken } from "../../helpers/tokenAuth.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await servicesAuth.findUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await servicesAuth.register({
    ...req.body,
    password: hashPassword,
  });

  const { _id: id } = newUser;

  const payload = {
    id,
  };

  const token = generateToken(payload);

  if (!newUser) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json({
    user: {
      email: newUser.email,
      token: token,
    },
  });
};

export default register;
