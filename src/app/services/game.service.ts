import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameModel } from '../common/game-model';
import { PlayerByDay } from '../common/PlayerEntity/playerByDay';
import { Player } from '../common/PlayerEntity/player';
import { environment } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getUserScores(): Observable<GetResposePlayer> {

    const getUserScoreUrl = `${this.baseUrl}/stats/get-user-scores`;

    return this.httpClient.get<GetResposePlayer>(getUserScoreUrl);
  }

  getWinnerByDay(): Observable<GetResposeChildPlayer> {
    
    const getWinnerByDayUrl = `${this.baseUrl}/stats/winner-by-day`;

    return this.httpClient.get<GetResposeChildPlayer>(getWinnerByDayUrl);
  }

  getAllData(): Observable<GetAllData> {
    
    const getAllGamesUrl = `${this.baseUrl}/stats/all-game-data`;

    return this.httpClient.get<GetAllData>(getAllGamesUrl);

  }

  deleteGame(gameId: number, token: string) {
    
    const deleteGameUrl = `${this.baseUrl}/game/delete/${gameId}`;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<GetResposePlayer>(deleteGameUrl, {headers})

  }

}

interface GetResposePlayer {
  status: string,
  message: string,
  data: Player[]
}

interface GetResposeChildPlayer {
  status: string,
  message: string,
  data: PlayerByDay[]
}

interface GetAllData {
  status: string,
  message: string,
  data: GameModel[]
}
