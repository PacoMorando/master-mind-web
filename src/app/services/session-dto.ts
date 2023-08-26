export class SessionDTO {
    constructor(
        public finished: boolean,
        public undoable: boolean,
        public whites: number[],
        public winner: boolean,
        public currentAttempt: number,
        public blacks: number[],
        public redoable: boolean,
        public secretCombination: string,
        public proposedCombinations: string[]
    ) {
        
     }
}
