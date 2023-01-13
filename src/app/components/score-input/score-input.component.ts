import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { Player } from 'src/app/common/PlayerEntity/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-score-input',
  templateUrl: './score-input.component.html',
  styleUrls: ['./score-input.component.css']
})
export class ScoreInputComponent {

  players: Player[] = [];
  isPlayerChecked: boolean = false;
  myForm!: FormGroup;

  playerForm: any[] = [];

  results: any[] = [];

  isWinnerSelected:boolean = false; 
  counter:number = 0;
  successMsg: string = '';


  
  constructor(private playerService: PlayerService,
    private fb: FormBuilder) { }

  ngOnInit(): void{
    this.myForm = this.fb.group({
      userId: this.fb.array([])
    });
    this.getAllPlayers()
  }

  

  getAllPlayers() {
    console.log('getting players')
    this.playerService.getAllPlayers().subscribe(
      data => {
        console.log(data)
        this.players = data;
      },(err) =>{
        console.log("err")
      }
    )
  }

  onChange(ids: number, playerName: string, isChecked: boolean) {
    const playerformarray = <FormArray>this.myForm?.controls['userId'];
    console.log(ids)

    //console.log(playerformarray.controls)

    if(isChecked) {
      playerformarray.push(new FormControl(ids));
      this.isPlayerChecked = isChecked;
      //this.playerForm = playerformarray.value;

      this.results.push([ids, playerName]);        

      //console.log(this.results);
    } else {
      let index = playerformarray.controls.findIndex(x=> x.value == ids)
      console.log(index)
      playerformarray.removeAt(index)
      //delete this.results[index]
      this.results.splice(index, 1)
      //playerformarray.push(new FormControl(ids));
      //console.log(this.results)
    }

  }
 
  addWinner(winner: string) {
 
    var winnerId: number;
    //type cast from string to number
    winnerId = +winner;
    var currentPlayerList:number[] = [];
    this.isWinnerSelected = true
    this.counter++;

    //console.log(this.results)

    this.results.map(
      (id) => {
        currentPlayerList.push(id[0]);
      }
    )

    var errormsg = "";
    //call servcie and pass winner and players
    this.playerService.addScore(currentPlayerList,winnerId).subscribe(
      (data) => {
        this.successMsg = data.message;
        console.log(this.successMsg)
      },(err) =>{
        errormsg = err;
        console.log(err)
      }
    )
    console.log(currentPlayerList);



  }
  
}
