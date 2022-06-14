const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken');

const { User } = require("../models");

module.exports = () => {
    passport.use('kakao',
        new KakaoStrategy(
            {
                clientID: 'f2e72f87161c0d4520dc21d6229d6dff',
                callbackURL: 'http://localhost:4000/api/kakao/callback',
            },
            async (_, __, profile, done) => {
                const email = profile.id
                const nickname = profile.nickname
                const password = profile.id

                let user = await User.findOne({ where: {email} })

                if (!user) {
                    user = await User.create({ email, nickname, password })
                }

                const token = jwt.sign({ userId: user.userId }, "my-secret-key");

                return done(null, user, token)
            }
        )
    )
}
