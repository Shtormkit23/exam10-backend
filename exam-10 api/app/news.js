const {nanoid} = require("nanoid");
const express = require("express");
const multer = require("multer");
const config = require("../config");
const router = express.Router();
const path = require("path");

const resource = 'news';
const relation = 'comments';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const items = await db.getItems(resource);
            res.send(items);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    router.get("/:id", async (req, res) => {
        const id = req.params.id;
        const result = await db.getItem(resource, id);

        if(!result.length) {
            res.send('Row with id - ['+id+'] not found');
        }

        res.send(result[0]);
    });

    router.post("/", upload.single("image"), async (req, res) => {
        const data = req.body;

        if (req.file) {
            data.image = req.file.filename;
        }

        data.date_of_create = new Date()

        const qb = await db.createItem(resource, data);
        const result = await db.getItem(resource, qb.insertId)
        res.send(result[0]);
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id;
        const comments = await db.getNewsComments(relation, id)

        comments.forEach(comment => db.deleteItem(relation, comment.id));
        db.deleteItem(resource, id)
        res.send("Row with id - ["+ id + "] removed");
    });

    router.get("/:id/comments", async (req, res) => {
        const id = req.params.id;

        try{
            const items = await db.getNewsComments(relation, id);
            res.send(items);
        } catch (e) {
            res.status(500).send(e);
        }
    });
    return router;
}

module.exports = createRouter;