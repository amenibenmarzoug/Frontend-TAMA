import { FuseUtils } from '@fuse/utils';
export class Document
{
    id: number;
    documentName: string;
    documentType:string;
    data:File;
    course: any;
    trainer: any;
    
    /**
     * Constructor
     *
     * @param training
     */
    constructor(file)
    {
        {
            this.id = file.id;
            this.documentName = file.documentName || '';
            this.documentType = file.documentType || '';
            this.data = file.data || '';
            this.course = file.course || '';
            this.trainer = file.trainer || '';
           
        
        }
    }
}
