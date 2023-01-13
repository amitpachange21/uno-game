import { Component } from '@angular/core';
import { GameModel } from 'src/app/common/game-model';
import { Player } from 'src/app/common/PlayerEntity/player';
import { GameService } from 'src/app/services/game.service';
import { ToastrService } from 'ngx-toastr/public_api';
import { PlayerByDay } from 'src/app/common/PlayerEntity/playerByDay';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.css']
})
export class GameDashboardComponent {

  players: Player[] = [];
  status: string = '';
  childPlayers: PlayerByDay[] = [];


  general: any[] = [];
  
  message: string = ''; 

  //paginantion attributes
  page: number = 1;
  pageSize: number = 6;
  totalGameSize = 10;


  constructor(private gameService: GameService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserScores();
    this.getallGameData();
    this.getWinnerByDay();
  }

  getWinnerByDay() {
    this.gameService.getWinnerByDay().subscribe(
      data => {
        this.childPlayers = data.data;
        //console.log(this.players)
      }
    )
  }

  getUserScores() {
    this.gameService.getUserScores().subscribe(
      data => {
        if (data.data.length > 0) {
          this.players = data.data;
          //console.log(this.players);
        } else {
          this.status = data.status;
        }
      }
    )
  }




  getallGameData() {
    this.gameService.getAllData().subscribe(
      data => {

        var json_data = data.data;
        var result = [];

        for (var i in json_data)
          result.push([json_data[i]]);

          result.map((country, i) => ({ id: i + 1, ...country })).slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize,
          );

        this.general = result;

        //console.log(this.general);
        // this.gameModels = data.data;

        // var objectWithGroupByName:any = [];
        // for (var key in this.gameModel) {
        //   var gameId = this.gameModel[key].game_id;
        //   if (!objectWithGroupByName[gameId]) {
        //     objectWithGroupByName[gameId] = [];
        //   }
        //   objectWithGroupByName[gameId].push(this.gameModel[key]);

        // }
        // objectWithGroupByName;
        // console.log(objectWithGroupByName)

        // var lookup = [];
        // var items = data.data;
        // var result = [];

        // for (var item, i = 0; item = items[i++];) {
        //   var gameid = item.game_id;

        //   if (!(gameid in lookup)) {
        //     lookup[gameid] = 1;
        //     result.push(gameid);
        //   }
        // }

        // console.log(result);

        // var myMap = new Map<number, GameModel[]>()


        // var newarr: GameModel[] = new Array;

        // for (var i = 0; i < result.length; i++) {
        //   for (var j = 0; j < items.length; j++) {
        //     if (result[i] == this.gameModel[j].game_id ) {
        //      // newarr.push(new General(result[i], this.gameModel[j]));
        //      newarr.push(this.gameModel[j]);
        //      myMap.set(result[i], newarr);
        //     }
        //   }
        // }

        // console.log(myMap);

      }
    )

  }

  deleteGame(gameId: number) {
    if(this.authService.isLoggedIn()) {
      this.gameService.deleteGame(gameId, localStorage.getItem('token')!).subscribe(
        data => {
          this.message = data.message;
          this.getallGameData();
        }
      );
    } else {
      this.router.navigateByUrl('/login')
    }
    
  }

}

