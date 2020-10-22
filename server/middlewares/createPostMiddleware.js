module.exports =  {
    createPostMiddleware : (req, res, next) => {
    const {title , body} = req.body;
        !title || !body ? res.status(422).json({err: "title and body shouldn't be empty"}) : next()
    }
}