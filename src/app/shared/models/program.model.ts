
export class Program{

    id: number;
    programName:string;
    nbDaysProg: number;
    specificProgram: boolean ; 

    constructor(program)
    {
        this.id = program.id;
        this.programName = program.programName || '';
        this.nbDaysProg = program.nbDaysProg || '';
        this.specificProgram=program.specificProgram ; 

    }
}
