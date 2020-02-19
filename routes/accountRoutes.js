const express = require("express");
const router = express.Router();
const Db = require("../data/dbConfig");
router.use(express.json());



router.get("/", (req, res) => {
  Db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500)
        .json({ message: "Could not retrieve data from database" });
    });
});

router.get("/:id", (req, res) => {
  Db("accounts")
  .where({id: req.params.id})
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(() => {
      res.status(500)
        .json({ message: "Error retrieving account from database." });
    });
});



router.post("/", (req, res) => {
  const account = req.body;
  if (account.name && account.budget) {
    //  INSERT INTO Accounts (account)
    Db("accounts")
      .insert(account)
      .then(account => {
        res.status(200)
          .json({ message: "Created new account.", response: account });
      })
      .catch(err => {
        res.status(400).json({
          message: "Error occurred when adding new account to database",
          error: err
        });
      });
  } else {
    res.status(400).json({
      message: "Unable to add new account to database due to missing data."
    });
  }
});



router.put("/:id", (req, res) => {
  Db("accounts")
    .where({ id: req.params.id})
    .update(req.body)
    .then(updVal => {
      res.status(200).json(updVal);
    })
    .catch(error => {
      console.log("put error");
      res.status(500).json({ message: "Update failed" });
    });
});



router.delete("/:id", (req, res) => {
  Db("accounts")
    .where("id", req.params.id)
    .del()
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(error => {
      console.log("delete error");
      res.status(500).json({ message: "Error removing account from database." });
    });
});

module.exports = router;