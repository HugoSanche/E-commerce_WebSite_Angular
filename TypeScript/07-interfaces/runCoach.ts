import { coach } from "./Coach";

export class runCoach implements coach{
    getDailyworkout(): string {
        return "Run 15 kilometers";
    }
    
}