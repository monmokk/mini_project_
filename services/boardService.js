const {Board, User} = require("../models");

const listUp = async () => {
    return await Board.findAll({
        include: {
            model: User,
            attributes: ['nickname']
        }
    });
}
const detailPage = async (boardId) => {
    return await Board.findByPk(boardId, {});
}
const createPage = async (board) => {
    return await Board.create(board)
}
const deletePage = async (boardId) => {
    return await Board.destroy({where: {boardId}})
}
const updatePage = async (title, content, boardId, userId) => {
    return Board.update({title, content}, {where: {boardId, userId}});
}
module.exports = {
    listUp,
    detailPage,
    createPage,
    deletePage,
    updatePage
}
