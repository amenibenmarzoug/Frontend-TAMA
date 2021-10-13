
import{ThemeDetail} from './themeDetail.model';
import{ModuleInstance} from './moduleInstance.model' ; 

export class ThemeDetailInstance {
    id: any;
    themeDetailInstName:string;
    nbDaysthemeDetailInst: number;
    themeDetail: ThemeDetail;
    moduleInstance: ModuleInstance;
    
    /**
     * Constructor
     *
     * @param themeDetailInstance
     */
    constructor(themeDetailInstance)
    {
        {
            this.id = themeDetailInstance.id ;
            this.themeDetail = themeDetailInstance.themeDetail || '';
            this.moduleInstance = themeDetailInstance.moduleInstance || '';
            this.themeDetailInstName = themeDetailInstance.themeDetailInstName || '';
            this.nbDaysthemeDetailInst=themeDetailInstance.nbDaysthemeDetailInst || '';
        
        }
    }
}
