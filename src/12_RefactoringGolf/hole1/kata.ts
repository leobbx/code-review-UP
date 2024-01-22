/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
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
    if (this._board.TileAt(x, y).isNotEmptySymbol()) {
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
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this._board.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this._board.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this._board.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this._board.TileAt(row, firstColumn).isNotEmptySymbol() &&
      this._board.TileAt(row, secondColumn).isNotEmptySymbol() &&
      this._board.TileAt(row, thirdColumn).isNotEmptySymbol()
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this._board.TileAt(row, firstColumn).hasSameSymbolAs(this._board.TileAt(row, secondColumn)) &&
      this._board.TileAt(row, thirdColumn).hasSameSymbolAs(this._board.TileAt(row, secondColumn))
    );
  }
}

class Tile {
  private _X: number = 0;
  private _Y: number = 0;
  private _Symbol: string = emptyPlay;

  constructor(x: number,y: number, symbol: string) {
    this._X = x;
    this._Y = y;
    this._Symbol = symbol;
  }
  get X(): number {
    return this._X;
  }

  get Y(): number {
    return this._Y;
  }

  get Symbol(): string {
    return this._Symbol;
  }

  set Symbol(value: string) {
    this._Symbol = value;
  }

  hasSameSymbolAs(other: Tile) {
    return this._Symbol === other._Symbol;
  }

  public isNotEmptySymbol(): boolean {
    return this._Symbol != emptyPlay;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        const tile: Tile = new Tile(i,j,emptyPlay);
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
