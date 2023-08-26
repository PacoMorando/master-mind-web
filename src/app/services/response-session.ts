export interface ResponseSession {
    "finished": boolean,
    "undoable": boolean,
    "whites": number[],
    "winner": boolean,
    "currentAttempt": number,
    "blacks": number[],
    "redoable": boolean,
    "secretCombination": string,
    "proposedCombinations": string[]
}
