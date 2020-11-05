

export class Module
{
    id: any;
    moduleName: string;
    nbDaysModule: string;
    theme:any;
   
    
    /**
     * Constructor
     *
     * @param module
     */
    constructor(module)
    {
        {
            this.id = module.id ;
            this.moduleName = module.moduleName || '';
            this.nbDaysModule = module.nbDaysModule || '';
            this.theme = module.theme || null;
           
        
        }
    }
}
