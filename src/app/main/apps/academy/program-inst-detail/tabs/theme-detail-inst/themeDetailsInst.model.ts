
import{ThemeDetail} from '../../../programDetails/tabs/themeDetail/theme-detail.model';
import{ModuleInst} from '../../../program-inst-detail/tabs/module-inst/moduleInst.model';
export class ThemeDetailInst
{
    id: any;
    themeDetail: ThemeDetail;
    moduleInstance: ModuleInst;
    themeDetailInstBeginDate:Date;
    themeDetailInstEndDate:Date;
   
    
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
            this.themeDetailInstBeginDate = themeDetail.themeDetailInstBeginDate || '';
            this.themeDetailInstEndDate=themeDetail.themeDetailInstEndDate || '';
        
        }
    }
}
