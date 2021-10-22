import{Theme} from 'app/shared/models/theme.model';
import{ProgramInst} from '../../../programInst.model';
export class ThematiqueInst {
    id: number;
    themeInstName:string;
    nbDaysthemeInst:number;
    //themeInstBeginDate:Date;
    //themeInstEndDate:Date;
    theme:Theme;
    programInstance:ProgramInst;

    /**
     * Constructor
     *
     * @param training
     */

    constructor(theme) {
        {
            this.id = theme.id;
            this.themeInstName = theme.themeInstName ||'';
            this.nbDaysthemeInst = theme.nbDaysthemeInst || '';
           // this.themeInstBeginDate = theme.themeInstBeginDate || '';
            //this.themeInstEndDate = theme.themeInstEndDate || '';
            this.theme= theme.theme || '';
            this.programInstance= theme.programInstance || '';



        }
    }

}
