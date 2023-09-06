export class BoardDTO {
    public finished: boolean = false;
    public undoable: boolean = false;
    public whites: number[] = [];
    public winner: boolean = false;
    public currentAttempt: number = 0;
    public blacks: number[] = [];
    public redoable: boolean = false;
    public secretCombination: string = "";
    public proposedCombinations: string[] = [];

    constructor() {}
}
