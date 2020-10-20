/*export class ContactsFakeDb
{
    public static contacts = [
        {
            'id'      : '5725a680b3249760ea21de52',
            'name'    : 'Abbott',
            'lastName': 'Keitch',
            'specification': 'Digital Archivist',
            'email'   : 'abbott@withinpixels.com',
            'phone'   : '+1-202-555-0175',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
            
        },
        {
            'id'      : '5725a680606588342058356d',
            'name'    : 'Arnold',
            'lastName': 'Matlock',
            'specification': 'Graphic Artist',
            'email'   : 'arnold@withinpixels.com',
            'phone'   : '+1-202-555-0141',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
           
        },
        {
            'id'      : '5725a68009e20d0a9e9acf2a',
            'name'    : 'Barrera',
            'lastName': 'Bradbury',
            'specification': 'Graphic Designer',
            'email'   : 'barrera@withinpixels.com',
            'phone'   : '+1-202-555-0196',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
           
        },
        {
            'id'      : '5725a6809fdd915739187ed5',
            'name'    : 'Blair',
            'lastName': 'Strangeway',
            'specification': 'Visual Designer',
            'email'   : 'blair@withinpixels.com',
            'phone'   : '+1-202-555-0118',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
            
        },
        {
            'id'      : '5725a68007920cf75051da64',
            'name'    : 'Boyle',
            'lastName': 'Winters',
            'specification': 'Catalogue Illustrator',
            'email'   : 'boyle@withinpixels.com',
            'phone'   : '+1-202-555-0177',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
           
        },
        {
            'id'      : '5725a68031fdbb1db2c1af47',
            'name'    : 'Christy',
            'lastName': 'Camacho',
            'specification': '3D Animator',
            'email'   : 'christy@withinpixels.com',
            'phone'   : '+1-202-555-0136',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
          
        },
        {
            'id'      : '5725a680bc670af746c435e2',
            'name'    : 'Copeland',
            'lastName': 'Redcliff',
            'specification': 'Multimedia Artist',
            'email'   : 'copeland@withinpixels.com',
            'phone'   : '+1-202-555-0107',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
           
        },
        {
            'id'      : '5725a680e7eb988a58ddf303',
            'name'    : 'Estes',
            'lastName': 'Stevens',
            'specification': 'Special Effects Artist',
            'email'   : 'estes@withinpixels.com',
            'phone'   : '+1-202-555-0113',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
           
        },
        {
            'id'      : '5725a680dcb077889f758961',
            'name'    : 'Harper',
            'lastName': 'MacGuffin',
            'specification': 'Application Developer',
            'email'   : 'harper@withinpixels.com',
            'phone'   : '+1-202-555-0173',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
         
        },
        {
            'id'      : '5725a6806acf030f9341e925',
            'name'    : 'Helen',
            'lastName': 'Sheridan',
            'specification': 'Content Developer',
            'email'   : 'helen@withinpixels.com',
            'phone'   : '+1-202-555-0163',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
            
        },
        {
            'id'      : '5725a680ae1ae9a3c960d487',
            'name'    : 'Henderson',
            'lastName': 'Cambias',
            'specification': 'Web Designer',
            'email'   : 'henderson@withinpixels.com',
            'phone'   : '+1-202-555-0151',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
            
        },
        {
            'id'      : '5725a680b8d240c011dd224b',
            'name'    : 'Josefina',
            'lastName': 'Lakefield',
            'specification': 'Web Developer',
            'email'   : 'josefina@withinpixels.com',
            'phone'   : '+1-202-555-0160',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
           
        },
        {
            'id'      : '5725a68034cb3968e1f79eac',
            'name'    : 'Katina',
            'lastName': 'Bletchley',
            'specification': 'Software Designer',
            'email'   : 'katina@withinpixels.com',
            'phone'   : '+1-202-555-0186',
            'street' : '933 8th Street',
            'city'   :  'tunis',
            'state'  :  'ariana',
            'postalCode': '6012'
            
        },
        
        
    ];

    public static user = [
        {
            'id'              : '5725a6802d10e277a0f35724',
            'name'            : 'John Doe',
            'avatar'          : 'assets/images/avatars/profile.jpg',
            'starred'         : [
                '5725a680ae1ae9a3c960d487',
                '5725a6801146cce777df2a08',
                '5725a680bbcec3cc32a8488a',
                '5725a680bc670af746c435e2',
                '5725a68009e20d0a9e9acf2a'
            ],
            'frequentContacts': [
                '5725a6809fdd915739187ed5',
                '5725a68031fdbb1db2c1af47',
                '5725a680606588342058356d',
                '5725a680e7eb988a58ddf303',
                '5725a6806acf030f9341e925',
                '5725a68034cb3968e1f79eac',
                '5725a6801146cce777df2a08',
                '5725a680653c265f5c79b5a9'
            ],
            'groups'          : [
                {
                    'id'        : '5725a6802d10e277a0f35739',
                    'name'      : 'Friends',
                    'contactIds': [
                        '5725a680bbcec3cc32a8488a',
                        '5725a680e87cb319bd9bd673',
                        '5725a6802d10e277a0f35775'
                    ]
                },
                {
                    'id'        : '5725a6802d10e277a0f35749',
                    'name'      : 'Clients',
                    'contactIds': [
                        '5725a680cd7efa56a45aea5d',
                        '5725a68018c663044be49cbf',
                        '5725a6809413bf8a0a5272b1',
                        '5725a6803d87f1b77e17b62b'
                    ]
                },
                {
                    'id'        : '5725a6802d10e277a0f35329',
                    'name'      : 'Recent Workers',
                    'contactIds': [
                        '5725a680bbcec3cc32a8488a',
                        '5725a680653c265f5c79b5a9',
                        '5725a6808a178bfd034d6ecf',
                        '5725a6801146cce777df2a08'
                    ]
                }
            ]
        }
    ];
}
*/