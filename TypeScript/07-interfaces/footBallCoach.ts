import { coach } from "./Coach";

export class footBallCoach implements coach{
    getDailyworkout(): string {
        return "Practices penatlys"
    }
}