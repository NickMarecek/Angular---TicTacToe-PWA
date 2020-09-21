import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  //represents 9 moves on game board
  squares: any[];
  //checks which player is next
  xNext: boolean;
  //determines winner
  winner: string;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }
  //called OnInit fills board array with null  values and sets default values
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xNext = true;
  }

  //function to return current player
  get player() {
    return this.xNext ? 'X':'O';
  }

  //event handler for user clicks
  //checks index in array that user clicked on, if empty or null splice in current player
  //toggles player boolean
  makeMove(idx: number){
    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xNext = !this.xNext;
    }
    //calculate if there is winner
    this.winner = this.calculateWinner();
  }

  calculateWinner(){
    //possible win conditions
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ){
        return this.squares[a];
      }
    }
    return null;
  }
}
