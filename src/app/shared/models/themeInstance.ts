import{Theme} from './theme.model';
import{ProgramInstance} from './programInstance.model';

export class ThemeInstance {
    id: number;
    themeInstName:string;
    nbDaysthemeInst:number;
    theme:Theme;
    programInstance:ProgramInstance;

    /**
     * Constructor
     *
     * @param themeInstance
     */

    constructor(themeInstance) {
        {
            this.id = themeInstance.id;
            this.themeInstName = themeInstance.themeInstName ||'';
            this.nbDaysthemeInst = themeInstance.nbDaysthemeInst || '';
            this.theme= themeInstance.theme || '';
            this.programInstance= themeInstance.programInstance || '';

        }
    }

}
