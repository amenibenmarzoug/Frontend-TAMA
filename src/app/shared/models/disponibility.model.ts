
import { FuseUtils } from '../../../@fuse/utils'


export class Disponibility {

    idTrainerDisponibility: number;
    trainer: any;
    trainerId: any;
    courseSession: any;
    courseSessionId: any;
    disponibility: boolean;

    /**
  * Constructor
  *
  * @param trainer @param courseSession
  */
    constructor(trainer, courseSession) {
        this.idTrainerDisponibility = FuseUtils.generateGUID();
        this.trainer = trainer;
        this.courseSession = courseSession;
        this.disponibility = true;

    }


}
