export class Program{

    id: number;
    programName:string;
    nbDaysProg: number;
    specificProgram: boolean ; 
    nbMaxParticipants : number ; 
    nbMinParticipants : number


   


    constructor(program)
    {
       // cursus = cursus || {};
        this.id = program.id;
        this.programName = program.programName || '';
        this.nbDaysProg = program.nbDaysProg || '';
        this.specificProgram=program.specificProgram ; 
        this.nbMaxParticipants = program.nbMaxParticipants || '';
        this.nbMinParticipants = program.nbMinParticipants || '';
        

    
    }
}

