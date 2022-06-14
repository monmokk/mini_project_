const { Op } = require("sequelize");

const { User } = require("../models");

const checkDuplicates = async (email, nickname) => {
    return await User.findAll({
        where: {
            [Op.or]: [{ email }, { nickname }],
        },
    })
}
const createUser = async (fields) => {
    return await User.create(fields);
}

const loginUser = async (email) => {
    return await User.findOne({
        where: {
            email
        },
    })
}

module.exports = {
    checkDuplicates,
    createUser,
    loginUser
}
