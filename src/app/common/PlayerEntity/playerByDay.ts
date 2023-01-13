import { BasePlayer } from "./BasePlayer";

export class PlayerByDay extends BasePlayer {

    constructor(public override id: number,
                public date: string,
                public override name: string,
                public override email: string,
                public total_score: string) {

                    super(id,name,email)

    }


}