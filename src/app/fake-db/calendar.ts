import { addDays, addHours, endOfDay, endOfMonth, startOfDay, subDays } from 'date-fns';

export class CalendarFakeDb
{

    public static data = [
        {
            id  : 'events',
            data: [
                {
                    idOwner: 2,
                    start    : subDays(startOfDay(new Date()), 1), 
                    end      : addDays(new Date(), 1),
                    title    : 'A 3 day event Nourhene',
                    allDay   : false,
                    color    : {
                        primary  : '#F44336',
                        secondary: '#FFCDD2'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Los Angeles',
                        notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
                    }
                },
                {
                    idOwner:1,
                    start    : startOfDay(new Date()),
                    end      : endOfDay(new Date()),
                    title    : 'An event',
                    allDay   : false,
                    color    : {
                        primary  : '#FF9800',
                        secondary: '#FFE0B2'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Los Angeles',
                        notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
                    }
                },
                {
                    idOwner:1,
                    start    : subDays(endOfMonth(new Date()), 3),
                    end      : addDays(endOfMonth(new Date()), 3),
                    title    : 'A long event that spans 2 months',
                    allDay   : false,
                    color    : {
                        primary  : '#1E90FF',
                        secondary: '#D1E8FF'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Los Angeles',
                        notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
                    }
                },
                {
                    idOwner:1,
                    start    : addHours(startOfDay(new Date()), 2),
                    end      : new Date(),
                    title    : 'A draggable and resizable event',
                    allDay   : false,
                    color    : {
                        primary  : '#673AB7',
                        secondary: '#D1C4E9'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: 'Los Angeles',
                        notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
                    }
                }
            ]
        }
    ];
}
