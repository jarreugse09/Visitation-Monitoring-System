import { User, type IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.util";
import mongoose from "mongoose";
import type { IPosition } from "../models/position.model";
const { Types } = mongoose;

interface SignupDto {
    name: string;
    username: string;
    password: string;
    position?: IPosition | null; // string from frontend
}

interface SigninDto {
    username: string;
    password: string;
}

class AuthService {
    async signup(data: SignupDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user
        const user = await User.create({
            name: data.name,
            username: data.username,
            password: hashedPassword,
            position: data.position?._id ?? null,
        } as IUser); // cast to IUser for TypeScript

        const token = signToken({ id: user._id.toString(), username: user.username });
        return { user, token };
    }

    async signin(data: SigninDto) {
        const user = await User.findOne({ username: data.username });
        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new Error("Incorrect password");

        const token = signToken({ id: user._id.toString(), username: user.username });
        return { user, token };
    }
}

export default new AuthService();
