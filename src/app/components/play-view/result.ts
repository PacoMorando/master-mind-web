export class Result {
    private proposedCombination: string[];
    private combinationResult: string[];

    constructor(proposedCombination: string, blacks: number, whites: number) {
        this.proposedCombination = this.setProposedCombination(proposedCombination);
        this.combinationResult = this.setResult(blacks, whites);
    }

    private setResult(blacks: number, whites: number): string[] {
        let result: string = '';
        for (let i = 0; i < blacks; i++) {
            result += 'k';
        }
        for (let i = 0; i < whites; i++) {
            result += 'w';
        }

        for (let i = this.proposedCombination.length; i > blacks + whites; i--) {
            result += 'f';
        }
        return Array.from(result);
    }

    private setProposedCombination(combination: string): string[] {
        return Array.from(combination);
    }

    public getProposedCombination(): string[] {
        return this.proposedCombination;
    }

    public getCombinationResult(): string[] {
        return this.combinationResult;
    }

}