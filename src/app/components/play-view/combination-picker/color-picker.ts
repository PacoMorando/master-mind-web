export class ColorPicker {
    private colorIterator: number = 0;
    private colorSelected: string;
    private colors: string[] = ["r", "g", "b", "c", "y", "m"];

    constructor() {
        this.colorSelected = this.colors[this.colorIterator];
    }

    public previousColor() {
        this.previousColorIterator();
        this.colorSelected = this.colors[this.colorIterator];
    }

    public nextColor() {
        this.nextColorIterator();
        this.colorSelected = this.colors[this.colorIterator];
    }

    private previousColorIterator() {
        if (this.colorIterator < this.colors.length - 1) {
            this.colorIterator++;
        } else {
            this.colorIterator = 0;
        }
    }

    private nextColorIterator() {
        if (this.colorIterator > 0) {
            this.colorIterator--;
        } else {
            this.colorIterator = 5;
        }
    }

    public getColorSelected(): string {
        return this.colorSelected;
    }
}