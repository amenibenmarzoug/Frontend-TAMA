
import{ThemeDetail} from '../../../programDetails/tabs/themeDetail/theme-detail.model';
import{ModuleInst} from '../../../program-inst-detail/tabs/module-inst/moduleInst.model';
export class ThemeDetailInst
{
    id: any;
    themeDetailInstName:string;
    nbDaysthemeDetailInst: number;
    themeDetail: ThemeDetail;
    moduleInstance: ModuleInst;

    //themeDetailInstBeginDate:Date;
    //themeDetailInstEndDate:Date;
   
    
    /**
     * Constructor
     *
     * @param themeDetail
     */
    constructor(themeDetail)
    {
        {
            this.id = themeDetail.id ;
            this.themeDetail = themeDetail.themeDetail || '';
            this.moduleInstance = themeDetail.moduleInstance || '';
            this.themeDetailInstName = themeDetail.themeDetailInstName || '';
            this.nbDaysthemeDetailInst=themeDetail.nbDaysthemeDetailInst || '';
        
        }
    }
}
