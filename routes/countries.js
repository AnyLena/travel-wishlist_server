import express from "express";
import { getCountries, postCountry, getCountry, putCountry, deleteCountry } from "../controllers/countries.js";
import { checkCountryCode } from "../middlewares/checkCountryCode.js";
import { checkCode } from "../middlewares/checkCode.js";

const countriesRouter = express.Router()

countriesRouter.get("/", getCountries)
countriesRouter.get("/:code", checkCountryCode, getCountry)
countriesRouter.post("/", checkCode, postCountry)
countriesRouter.put("/:code", checkCountryCode, putCountry)
countriesRouter.delete("/", deleteCountry)
// countriesRouter.post("/delete", deleteCountry)
// countriesRouter.delete("/:code", checkCountryCode, deleteCountry)

export default countriesRouter; 