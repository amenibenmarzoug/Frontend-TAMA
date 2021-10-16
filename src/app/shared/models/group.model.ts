
export class Group
{
    id: number;
    groupName: string;

    /**
     * Constructor
     *
     * @param group
     */
    constructor(group)
    {
        {
            this.id = group.id ;
            this.groupName = group.groupName || '';

        }
    }
}
