

// used to be named Thematique
export class Theme {
    id: number;
    themeName: string;
    nbDaysTheme: number;
    program: any;

    /**
     * Constructor
     *
     * @param theme
     */
    constructor(theme) {
        {
            this.id = theme.id;
            this.themeName = theme.themeName || '';
            this.nbDaysTheme = theme.nbDaysTheme || '';
            this.program = theme.program || null;


        }
    }
}
