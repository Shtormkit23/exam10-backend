module.exports = (db) => ({
    async getItems(resource) {
        let sql = ''
        switch (resource) {
            case 'news':
                sql = 'SELECT id, title, image, date_of_create FROM ??'
                break;
            case 'comments':
                sql = 'SELECT * FROM ??'
                break;
            default:
                break;
        }
        return new Promise((res,rej) => {
            db.query(sql, [resource], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        });
    },
    getItem(resource,id) {
        return new Promise((res,rej) => {
            db.query("SELECT * FROM ?? WHERE id = ?", [resource, id], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        });
    },
    createItem(resource, data) {
        return new Promise((res,rej) => {
            db.query("INSERT INTO ?? SET ?", [resource, data], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        })
    },
    deleteItem(resource,id) {
        db.query("DELETE FROM ?? WHERE id = ?", [resource, id], (error) => {
            if(error) {
                return error;
            }
        });
    },
    async getNewsComments(resource, newsId) {
        return new Promise((res,rej) => {
            db.query("SELECT * FROM ?? WHERE news_id = ?", [resource, newsId], (error, result) => {
                if(error) {
                    rej(error);
                }
                res(result);
            });
        });
    },
});