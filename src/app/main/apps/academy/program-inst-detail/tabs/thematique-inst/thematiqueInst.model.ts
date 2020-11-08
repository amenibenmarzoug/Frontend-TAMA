import{Thematique} from '../../../programDetails/tabs/thematique/thematique.model';
import{ProgramInst} from '../../../programInst.model';
export class ThematiqueInst {
    id: number;
    themeInstBeginDate:Date;
    themeInstEndDate:Date;
    theme:Thematique;
    programInstance:ProgramInst;

    /**
     * Constructor
     *
     * @param training
     */
    constructor(theme) {
        {
            this.id = theme.id;
            this.themeInstBeginDate = theme.themeInstBeginDate || '';
            this.themeInstEndDate = theme.themeInstEndDate || '';
            this.theme= theme.theme || '';
            this.programInstance= theme.programInstance || '';



        }
    }
}
