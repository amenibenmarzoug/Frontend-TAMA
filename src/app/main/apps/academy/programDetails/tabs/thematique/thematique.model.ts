

export class Thematique {
    id: number;
    themeName: string;
    nbDaysTheme: number;
    program: any;

    /**
     * Constructor
     *
     * @param training
     */
    constructor(theme) {
        {
            this.id = theme.id;
            this.themeName = theme.themeName || '';
            this.nbDaysTheme = theme.nbDaysTheme || '';
            this.program = theme.program || '';


        }
    }
}
