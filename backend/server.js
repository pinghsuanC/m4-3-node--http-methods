"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stock, customers } = require("./data/inventory.js");
const lable_ref = {
  // for future change in labels
  tshirt: "shirt",
  socks: "socks",
  bottle: "bottle",
};
const shirtSize_ref = {
  // for size references
  small: "small",
  medium: "medium",
  large: "large",
  extralarge: "xlarge",
};
const result_ref = {
  0: "success",
  1: "unavailable",
  2: "repeat-customer",
  3: "undeliverable",
  4: "missing-data",
};
const only_country = "canada";

// method to validate the request body
// return [false, error_id] when failed
// return [true, 0] when success
const validation = (input) => {
  // deconstruct the input
  const { order, size, givenName, surname, email, address, country } = input;
  console.log(size);
  // =============== 2. valid data received ( including email ) ===============
  // check whether size was selected when selecting tshirt
  // other data are required by form
  if (lable_ref[order] === "shirt") {
    if (size === "undefined") {
      return [false, 4]; // 4: missing data
    }
  }
  // check the email                            note: added the type checker in front-end
  /*if (!email.includes("@")) {
    return [false, 4]; // not so sure which error code this should be
  }*/
  // =============== 1. check user not in databse ( street address ) ===============
  //          if exists, reject
  //          if not, push to the customer list for future reference
  const allCustomers = Object.values(customers);
  let cus_checkd = false;
  for (let n = 0; n < allCustomers.length; n++) {
    let ele = allCustomers[n];
    //console.log(ele);
    // for all customers
    // email
    if (ele["email"] === email) {
      //console.log(email);
      return [false, 2]; // 2:repeat customer
    }
    // name and address
    let cur_name = `${ele["surname"]} ${ele["givenName"]}`.toLowerCase();
    let input_name = `${surname} ${givenName}`.toLowerCase();
    let cur_add = ele["address"].toLowerCase();
    let input_add = address.toLowerCase();
    if (cur_name === input_name) {
      // assumption: the address will be typed properly
      if (cur_add === input_add) {
        return [false, 2]; // 2:repeat customer
      }
    }
    if (n === allCustomers.length - 1) {
      cus_checkd = true;
    }
  }

  // =============== 3. address in canada ( check only country? ) ===============
  if (country.toLowerCase() !== only_country) {
    return [false, 3];
  }
  // =============== 4. check stock ===============
  if (lable_ref[order] === "shirt") {
    // get to size
    if (stock[lable_ref[order]][shirtSize_ref[size]] <= 0) {
      return [false, 1]; // code 1: unavailable
    }
  } else if (stock[lable_ref[order]] <= 0) {
    return [false, 1]; // code 1: unavailable
  } else if (stock[lable_ref[order]] === undefined) {
    return [false, 1]; // code 1: unavailable
  }

  // finally if checked customer and all above passed, add new customer
  if (cus_checkd) {
    // push to allCustomers
    const { order, size, ...new_cus } = input;
    customers.push(new_cus);
  }

  return [true, 0];
};

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {
    const [result, code] = validation(req.body);
    if (result) {
      res.status(200).json({ status: result_ref[code] });
    } else {
      res.status(400).json({ status: "error", error: result_ref[code] });
    }
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
