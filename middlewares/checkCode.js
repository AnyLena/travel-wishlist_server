import Country from "../models/Country.js";

export const checkCode = async (req, res, next) => {
  let code = req.body.alpha2Code || req.body.alpha3Code;
  code = code.toUpperCase();

  //checking if country Code has valid length
  if (code.length < 2 || code.length > 3) {
    res.status(404).send("Invalid Country code");
  } else {
    // checking for Country Code already existing in Database
    const alphaCode = { [`alpha${code.length}Code`]: code };
    const data = await Country.findOne(alphaCode);
    
    if (data) {
      res
        .status(404)
        .json({
            status: "failure",
            message: "Invalid Country Code. Country already exists in the Database.",
          });
    } else {
      next();
    }
  }
};
