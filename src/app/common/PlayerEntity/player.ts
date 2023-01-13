import { BasePlayer } from "./BasePlayer";

export class Player extends BasePlayer {

    constructor(public override id: number,
                public date: string,
                public override name: string,
                public override email: string,
                public total_wins: string) {
                    
                    super(id,name,email)

    }


}
