

export class Training
{
    id: any;
    courseName: string;
    content: string;
    theme: string;
    nbmaxParticipants: number;
    fees: number;
    cursus:any  ;
    
    /**
     * Constructor
     *
     * @param training
     */
    constructor(training)
    {
        {
            this.id = training.id ;
            this.courseName = training.courseName || '';
            this.content = training.content || '';
            this.theme = training.theme || '';
            this.nbmaxParticipants = training.nbmaxParticipants || '';
            this.fees = training.fees || '';
            this.cursus=training.cursus|| '' ; 
        
        }
    }
}
