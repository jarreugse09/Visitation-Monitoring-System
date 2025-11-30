import { Position, IPosition } from "../models/position.model";
import { Types } from "mongoose";
class PositionService {
    async createPositionforOffice(id: Types.ObjectId): Promise<IPosition> {
        return await Position.create({ officeId: id, })
    }
    async createPositionforCollege(dept: Types.ObjectId, col: Types.ObjectId) {
        return await Position.create({
            collegeId: col,
            departmentId: dept
        })
    }

    async createPositionforCollegeDean(officeId: Types.ObjectId,) {
        return await Position.create({
            officeId: officeId

        })
    }
}

export default new PositionService()