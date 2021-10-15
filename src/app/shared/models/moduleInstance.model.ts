
import{Module} from '../../../programDetails/tabs/module/module.model';
import{ThematiqueInst} from '../../tabs/thematique-inst/thematiqueInst.model';

export class ModuleInstance {
    id: any;
    moduleInstanceName: string;
    nbDaysModuleInstance: number;
    module:Module;
    themeInstance: ThematiqueInst;
    
    /**
     * Constructor
     *
     * @param module
     */
    constructor(module)
    {
        {
            this.id = module.id ;
            this.moduleInstanceName = module.moduleInstanceName || '';
            this.nbDaysModuleInstance = module.nbDaysModuleInstance || '';
            this.module = module.module || null;
            this.themeInstance = module.themeInstance || null;
           
        
        }
    }
}
