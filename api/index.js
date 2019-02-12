import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ data: [] });
});

router.get("/user", (req, res) => {
    res.send({ data: "test" });
});

export default router;
