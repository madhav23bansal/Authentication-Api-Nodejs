const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/",verify, (req, res) => {
    res.json({
        posts: { title: "First Post", description: "Some random stuff" },
    });
});

module.exports = router;
