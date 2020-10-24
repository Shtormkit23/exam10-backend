const express = require("express");

const router = express.Router();

const resource = 'comments';

const createRouter = (db) => {
    router.get("/", async (req, res) => {
        try{
            const comments = await db.getItems(resource);
            res.send(comments);
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

    router.post("/", async (req, res) => {
        const data = req.body;
        const news = await db.getItem('news', data.news_id);
        if(!data.author) {
            data.author = "Anonymous";
        }

        if(news.length === 0) {
            res.send('News with id ['+data.news_id+ '] not found');
        }

        const qb = await db.createItem(resource, data);
        const result = await db.getItem(resource, qb.insertId)
        res.send(result[0]);
    });



    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        db.deleteItem(resource, id)
        res.send("Row with id - ["+ id + "] removed");
    });

    return router;
}

module.exports = createRouter;