const {Board} = require("../models");

const listUp = async () => {
    return await Board.findAll();
}
const detailPage = async (boardId) => {
    return await Board.findByPk(boardId, {});
}
const createPage = async (board) => {
    return await Board.create(board)
}
const deletePage = async (boardId) => {
    return await Board.destroy({ where: { boardId }})
}
const updatePage = async (title, content, boardId, userId) => {
    return await Board.update({title, content}, {where: {boardId, userId}});
}
module.exports = {
    listUp,
    detailPage,
    createPage,
    deletePage,
    updatePage
}
