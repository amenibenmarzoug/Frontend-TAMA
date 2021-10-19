
import{Module} from '../models/module.model';
import{ThemeInstance} from '../models/themeInstance.model';

export class ModuleInstance {
    id: any;
    moduleInstanceName: string;
    nbDaysModuleInstance: number;
    module:Module;
    themeInstance: ThemeInstance;
    
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




