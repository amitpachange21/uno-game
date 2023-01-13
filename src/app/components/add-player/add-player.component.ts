import { Component } from '@angular/core';
import { Player } from 'src/app/common/PlayerEntity/player';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {

  players: Player[] = [];
  message: string = "";
  status: string = "";

  //inject player service in constructor
  constructor(private playerService: PlayerService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  addPlayer(name: string, email: string) {

    console.log(`Data passed --> name is ${name} email is ${email}`);

    if (this.authService.isLoggedIn()) {
      //call add method in servie
      let token: string = localStorage.getItem('token')!;
      this.playerService.addPlayer(name, email, token).subscribe(
        data => {
          this.message = data.message;
          this.status = data.status;
          this.getAllPlayers()
        }
      );
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  getAllPlayers() {
    //console.log('get players')
    this.playerService.getAllPlayers().subscribe(
      data => {

        if (data) {
          hideloader();
        }

        this.players = data;
        //console.log(data)
      }
    );

  }

  deletePlayer(playerId: number) {
    if(this.authService.isLoggedIn()) {
      this.playerService.deletePlayer(playerId).subscribe(
        data => {
          this.message = data.message;
          this.getAllPlayers();
        }
      );
    } else {
      this.router.navigateByUrl('/login');
    }
    
  }


}
function hideloader() {
  const html = document.getElementById('loading')!;
  html.style.display = 'none'
}

