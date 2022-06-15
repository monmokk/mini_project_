const {boardService} = require("../services");

const listUp = async (req, res) => {
    const lists = await boardService.listUp();
    res.status(200).send({
        lists
    });
}
const detailPage = async (req, res) => {
    const { boardId } = req.params;
    const detailPage = await boardService.detailPage(boardId);
    res.status(200).send({
        detailPage
    })
}
const savePage = async (req, res) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const result = await boardService.createPage({title, content, userId});
    res.status(200).send({
        result
    })
}
const deletePage = async (req, res) => {
    const { boardId } = req.params;
    const { userId } = res.locals.user;
    const existPage = await boardService.detailPage(boardId);

    if(existPage === null) {
        res.status(403).send({
            message: "게시글이 존재하지 않습니다",
        });
        return;
    }
    if (userId !== existPage.userId) {
        res.status(401).send({ message: "작성자가 아닙니다" });
        return
    }

    await boardService.deletePage(boardId)
    res.status(200).send({})
}
const updatePage = async (req, res) => {
    const { boardId } = req.params;
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    const existPage = await boardService.detailPage(boardId);

    if(existPage === null) {
        res.status(403).send({
            message: "게시글이 존재하지 않습니다",
        });
        return;
    }
    if (userId !== existPage.userId) {
        res.status(401).send({ message: "작성자가 아닙니다" });
        return
    }
    await boardService.updatePage(title, content, boardId, userId)
    res.status(200).send({})
}

const fileUpload = async (req, res) => {
    try {
        res.status(200).send({
            result: req.file.filename,
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            message: `${err}`,
        });
    }
}

module.exports = {
    listUp,
    detailPage,
    savePage,
    deletePage,
    updatePage,
    fileUpload
}
