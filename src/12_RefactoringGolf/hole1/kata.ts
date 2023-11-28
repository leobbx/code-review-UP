/* eslint-disable */
const PLAYER_O = 'O';
const EMPTY_PLAY = ' ';

const FIRST_ROW = 0;
const SECOND_ROW = 1;
const THIRD_ROW = 2;
const FIRST_COLUMN = 0;
const SECOND_COLUMN = 1;
const THIRD_COLUMN = 2;

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == EMPTY_PLAY) {
      if (player == PLAYER_O) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != EMPTY_PLAY) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isRowFull(FIRST_ROW) && this.isRowFullWithSameSymbol(FIRST_ROW)) {
      return this._board.TileAt(FIRST_ROW, FIRST_COLUMN)!.Symbol;
    }

    if (this.isRowFull(SECOND_ROW) && this.isRowFullWithSameSymbol(SECOND_ROW)) {
      return this._board.TileAt(SECOND_ROW, FIRST_COLUMN)!.Symbol;
    }

    if (this.isRowFull(THIRD_ROW) && this.isRowFullWithSameSymbol(THIRD_ROW)) {
      return this._board.TileAt(THIRD_ROW, FIRST_COLUMN)!.Symbol;
    }

    return EMPTY_PLAY;
  }

  private isRowFull(row: number) {
    return (
      this._board.TileAt(row, FIRST_COLUMN)!.Symbol != EMPTY_PLAY &&
      this._board.TileAt(row, SECOND_COLUMN)!.Symbol != EMPTY_PLAY &&
      this._board.TileAt(row, THIRD_COLUMN)!.Symbol != EMPTY_PLAY
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this._board.TileAt(row, FIRST_COLUMN)!.Symbol ==
        this._board.TileAt(row, SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(row, THIRD_COLUMN)!.Symbol ==
        this._board.TileAt(row, SECOND_COLUMN)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
