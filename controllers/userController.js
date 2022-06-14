const Joi = require("joi");
const {userService} = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const postUsersSchema = Joi.object({
    nickname: Joi.string().min(3).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().disallow(Joi.ref('nickname')).required(),
    confirmPassword: Joi.equal(Joi.ref('password'))
});

const postAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const duplicatesCheck = async (req, res) => {
    let {email, nickname} = req.params;

    if (typeof email === "undefined") {
        email = null
    } else if (typeof nickname === "undefined") {
        nickname = null
    }

    const existUser = await userService.checkDuplicates(email, nickname)
    if (existUser.length) {
        res.status(400).send({
            errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
        });
    } else {
        res.status(200).send({})
    }

};
const login = async (req, res) => {
    const { email, password } = await postAuthSchema.validateAsync(req.body);
    const user = await userService.loginUser(email);
    const authenticate = await bcrypt.compare(password, user.password);
    console.log(authenticate)
    if (!user || !authenticate) {
        res.status(400).send({
            errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
        });
        return;
    }
    const token = jwt.sign({ userId: user.userId }, "my-secret-key"); //process.env.SECRET_KEY

    res.send({
        token,
    });

}
const signUp = async (req, res) => {
    try {
        const {nickname, email, password, confirmPassword} = await postUsersSchema.validateAsync(req.body);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await userService.createUser({
            email,
            password: hashedPassword,
            nickname,
        });
        res.status(200).send({
            result: createdUser,
        });
    } catch (err) {
        console.error(err);
        res.status(400).send({
            message: `${err} : 회원가입 실패`,
        });
    }
}

module.exports = {
    login,
    signUp,
    duplicatesCheck
}
