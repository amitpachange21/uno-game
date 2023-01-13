import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Player } from '../common/PlayerEntity/player';
import { map, Observable } from 'rxjs';
import { environment } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  addPlayer(name: string, email: string, token: string): Observable<GetResposePlayer> {

    const addPlayerUrl = `${this.baseUrl}/add/`;
    
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    let params = new HttpParams();
    params = params.append("name", name);
    params = params.append("email", email);

    return this.httpClient.get<GetResposePlayer>(addPlayerUrl, { params: params, headers: headers})
  }

  getAllPlayers(): Observable<Player[]> {

    const allPlayerUrl = `${this.baseUrl}/player/all`;

    return this.httpClient.get<GetResposePlayer>(allPlayerUrl).pipe(
      map(response => response.data)
    )
  }

  addScore(currentPlayerList: number[], winnerId: number): Observable<GetResposePlayer> {

    const saveScoreUrl = `${this.baseUrl}/score/store/?`;

    let params = new HttpParams();
    params = params.append('player_ids', currentPlayerList.join(','));
    params = params.append("player_winner_id", winnerId);

    return this.httpClient.get<GetResposePlayer>(saveScoreUrl + params);
  }

  deletePlayer(playerId: number): Observable<GetResposePlayer> {
    
    const deletePlayerUrl = `${this.baseUrl}/player/delete/${playerId}`;

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    return this.httpClient.delete<GetResposePlayer>(deletePlayerUrl, {headers: headers});

  }

}

interface GetResposePlayer {
  status: string,
  message: string,
  data: Player[];

}
