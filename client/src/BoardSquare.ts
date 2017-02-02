/**
 * Created by will on 7/8/16.
 */

export class BoardSquare {

    private x: number;
    private y: number;

    private tableCell: HTMLTableCellElement;

    constructor(x: number, y: number, tableCell: HTMLTableCellElement) {
        this.x = x;
        this.y = y;
        this.tableCell = tableCell;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
    
    public getTableCell(): HTMLTableCellElement {
        return this.tableCell;
    }
}