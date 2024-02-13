import express from "express";
import { getCountries, postCountry, getCountry, putCountry, deleteCountry } from "../controllers/countries.js";
import { checkCountryCode } from "../middlewares/checkCountryCode.js";
import { checkCode } from "../middlewares/checkCode.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const countriesRouter = express.Router()

countriesRouter.get("/", getCountries)
countriesRouter.get("/:code", checkCountryCode, getCountry)
countriesRouter.post("/", verifyToken, checkCode, postCountry)
countriesRouter.put("/:code", verifyToken, checkCountryCode, putCountry)
countriesRouter.delete("/", verifyToken, deleteCountry)
// countriesRouter.post("/delete", deleteCountry)
// countriesRouter.delete("/:code", checkCountryCode, deleteCountry)

export default countriesRouter; 