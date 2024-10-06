import mongoose from "mongoose";

const notEmpty = mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});

export default notEmpty;