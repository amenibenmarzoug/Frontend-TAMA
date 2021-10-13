

export class ThemeDetail
{
    id: any;
    themeDetailName: string;
    nbDaysThemeDetail: string;
    module:any;
   
    
    /**
     * Constructor
     *
     * @param themeDetail
     */
    constructor(themeDetail)
    {
        {
            this.id = themeDetail.id ;
            this.themeDetailName = themeDetail.themeDetailName || '';
            this.nbDaysThemeDetail = themeDetail.nbDaysThemeDetail || '';
            this.module = themeDetail.module || null;
           
        
        }
    }
}
