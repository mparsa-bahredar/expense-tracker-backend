import jwt from "jsonwebtoken"


class JWTService{
    generateToken(id: number) {
        return jwt.sign(
            { id },
            process.env.JWT_SECRET!
        );
    }
}

export default JWTService