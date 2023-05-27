import { coach } from "./Coach";
import { footBallCoach } from "./footBallCoach";
import { runCoach } from "./runCoach";


let myRunCoach=new runCoach();
let myFootBallCoach= new footBallCoach();

let arrayCoach:coach[]=[];

arrayCoach.push(myFootBallCoach);
arrayCoach.push(myRunCoach);
for(let tempArray of arrayCoach){
    console.log(tempArray.getDailyworkout());

}
