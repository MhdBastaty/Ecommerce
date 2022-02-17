const router = require('express').Router();



router.get("/usertest", (req, res) => {
    res.send("succsess");
});

router.post("/userposttest", (req, res) => {
    const username = req.body.username;
    console.log(username);
    res.status(201).json(username)
});
module.exports = router;