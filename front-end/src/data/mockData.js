import { tokens } from '../theme';

export const mockDataTeam = [
  {
    id: 1,
    name: 'Jon Snow',
    email: 'jonsnow@gmail.com',
    age: 35,
    phone: '(665)121-5454',
    access: 'admin',
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    email: 'cerseilannister@gmail.com',
    age: 42,
    phone: '(421)314-2288',
    access: 'manager',
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    email: 'jaimelannister@gmail.com',
    age: 45,
    phone: '(422)982-6739',
    access: 'user',
  },
  {
    id: 4,
    name: 'Anya Stark',
    email: 'anyastark@gmail.com',
    age: 16,
    phone: '(921)425-6742',
    access: 'admin',
  },
  {
    id: 5,
    name: 'Daenerys Targaryen',
    email: 'daenerystargaryen@gmail.com',
    age: 31,
    phone: '(421)445-1189',
    access: 'user',
  },
  {
    id: 6,
    name: 'Ever Melisandre',
    email: 'evermelisandre@gmail.com',
    age: 150,
    phone: '(232)545-6483',
    access: 'manager',
  },
  {
    id: 7,
    name: 'Ferrara Clifford',
    email: 'ferraraclifford@gmail.com',
    age: 44,
    phone: '(543)124-0123',
    access: 'user',
  },
  {
    id: 8,
    name: 'Rossini Frances',
    email: 'rossinifrances@gmail.com',
    age: 36,
    phone: '(222)444-5555',
    access: 'user',
  },
  {
    id: 9,
    name: 'Harvey Roxie',
    email: 'harveyroxie@gmail.com',
    age: 65,
    phone: '(444)555-6239',
    access: 'admin',
  },
];

export const mockDataContacts = [
  {
    id: 1,
    name: 'Jon Snow',
    email: 'jonsnow@gmail.com',
    age: 35,
    phone: '(665)121-5454',
    address: '0912 Won Street, Alabama, SY 10001',
    city: 'New York',
    zipCode: '10001',
    registrarId: 123512,
  },
  {
    id: 2,
    name: 'Cersei Lannister',
    email: 'cerseilannister@gmail.com',
    age: 42,
    phone: '(421)314-2288',
    address: '1234 Main Street, New York, NY 10001',
    city: 'New York',
    zipCode: '13151',
    registrarId: 123512,
  },
  {
    id: 3,
    name: 'Jaime Lannister',
    email: 'jaimelannister@gmail.com',
    age: 45,
    phone: '(422)982-6739',
    address: '3333 Want Blvd, Estanza, NAY 42125',
    city: 'New York',
    zipCode: '87281',
    registrarId: 4132513,
  },
  {
    id: 4,
    name: 'Anya Stark',
    email: 'anyastark@gmail.com',
    age: 16,
    phone: '(921)425-6742',
    address: '1514 Main Street, New York, NY 22298',
    city: 'New York',
    zipCode: '15551',
    registrarId: 123512,
  },
  {
    id: 5,
    name: 'Daenerys Targaryen',
    email: 'daenerystargaryen@gmail.com',
    age: 31,
    phone: '(421)445-1189',
    address: '11122 Welping Ave, Tenting, CD 21321',
    city: 'Tenting',
    zipCode: '14215',
    registrarId: 123512,
  },
  {
    id: 6,
    name: 'Ever Melisandre',
    email: 'evermelisandre@gmail.com',
    age: 150,
    phone: '(232)545-6483',
    address: '1234 Canvile Street, Esvazark, NY 10001',
    city: 'Esvazark',
    zipCode: '10001',
    registrarId: 123512,
  },
  {
    id: 7,
    name: 'Ferrara Clifford',
    email: 'ferraraclifford@gmail.com',
    age: 44,
    phone: '(543)124-0123',
    address: '22215 Super Street, Everting, ZO 515234',
    city: 'Evertin',
    zipCode: '51523',
    registrarId: 123512,
  },
  {
    id: 8,
    name: 'Rossini Frances',
    email: 'rossinifrances@gmail.com',
    age: 36,
    phone: '(222)444-5555',
    address: '4123 Ever Blvd, Wentington, AD 142213',
    city: 'Esteras',
    zipCode: '44215',
    registrarId: 512315,
  },
  {
    id: 9,
    name: 'Harvey Roxie',
    email: 'harveyroxie@gmail.com',
    age: 65,
    phone: '(444)555-6239',
    address: '51234 Avery Street, Cantory, ND 212412',
    city: 'Colunza',
    zipCode: '111234',
    registrarId: 928397,
  },
  {
    id: 10,
    name: 'Enteri Redack',
    email: 'enteriredack@gmail.com',
    age: 42,
    phone: '(222)444-5555',
    address: '4123 Easer Blvd, Wentington, AD 142213',
    city: 'Esteras',
    zipCode: '44215',
    registrarId: 533215,
  },
  {
    id: 11,
    name: 'Steve Goodman',
    email: 'stevegoodmane@gmail.com',
    age: 11,
    phone: '(444)555-6239',
    address: '51234 Fiveton Street, CunFory, ND 212412',
    city: 'Colunza',
    zipCode: '1234',
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    file_path: '/Users/brightlightkim/...',
    line_number: '1',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'command and control',
    analysis:
      '**Classification:** command and control\n**Analysis:** This is a command and control attack',
  },
  {
    id: 2,
    file_path: '/Users/brightlightkim/...',
    line_number: '2',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'priviledged escalation',
    analysis:
      '**Classification:** priviledged escalation\n**Analysis:** This is a priviledged escalation attack',
  },
  {
    id: 3,
    file_path: '/Users/brightlightkim/...',
    line_number: '3',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'data exfiltration',
    analysis:
      '**Classification:** data exfiltration\n**Analysis:** This is a data exfiltration attack',
  },
  {
    id: 4,
    file_path: '/Users/brightlightkim/...',
    line_number: '4',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'scan',
    analysis: '**Classification:** scan\n**Analysis:** This is a scan attack',
  },
  {
    id: 5,
    file_path: '/Users/brightlightkim/...',
    line_number: '5',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'password cracking',
    analysis:
      '**Classification:** password cracking\n**Analysis:** This is a password cracking attack',
  },
  {
    id: 6,
    file_path: '/Users/brightlightkim/...',
    line_number: '6',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'webshell upload',
    analysis:
      '**Classification:** webshell upload\n**Analysis:** This is a webshell upload attack',
  },
  {
    id: 7,
    file_path: '/Users/brightlightkim/...',
    line_number: '7',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'command and control',
    analysis:
      '**Classification:** command and control\n**Analysis:** This is a command and control attack',
  },
  {
    id: 8,
    file_path: '/Users/brightlightkim/...',
    line_number: '8',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'priviledged escalation',
    analysis:
      '**Classification:** priviledged escalation\n**Analysis:** This is a priviledged escalation attack',
  },
  {
    id: 9,
    file_path: '/Users/brightlightkim/...',
    line_number: '9',
    line: 'Jan 23 16:17:01 ...',
    context: 'Jan 23 16:17:01 ...',
    classification: 'data exfiltration',
    analysis:
      '**Classification:** data exfiltration\n**Analysis:** This is a data exfiltration attack',
  },
];

export const mockTransactions = [
  {
    txId: '01e4dsa',
    user: 'johndoe',
    date: '2024-03-28',
    cost: 'command and control',
  },
  {
    txId: '0315dsaa',
    user: 'jackdower',
    date: '2024-03-27',
    cost: 'priviledge escalation',
  },
  {
    txId: '01e4dsa',
    user: 'aberdohnny',
    date: '2024-03-25',
    cost: 'benign',
  },
  {
    txId: '51034szv',
    user: 'goodmanave',
    date: '2024-03-22',
    cost: 'priviledge escalation',
  },
  {
    txId: '0a123sb',
    user: 'stevebower',
    date: '2024-03-21',
    cost: 'data exfilteration',
  },
  {
    txId: '01e4dsa',
    user: 'aberdohnny',
    date: '2024-03-20',
    cost: 'benign',
  },
  {
    txId: '120s51a',
    user: 'wootzifer',
    date: '2024-03-20',
    cost: 'scan',
  },
  {
    txId: '0315dsaa',
    user: 'jackdower',
    date: '2022-04-01',
    cost: 'password cracking',
  },
];
// "command and control", "priviledged escalation", , , "password cracking", "webshell upload"
export const mockBarData = [
  {
    country: 'AD',
    'command and control': 137,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 96,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 72,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 140,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AE',
    'command and control': 47,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 125,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 36,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 127,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AF',
    'command and control': 153,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 26,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 96,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 126,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AG',
    'command and control': 135,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 48,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 36,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 85,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AI',
    'command and control': 165,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 25,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 39,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 95,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AL',
    'command and control': 123,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 92,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 38,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 182,
    donutColor: 'hsl(340, 70%, 50%)',
  },
  {
    country: 'AM',
    'command and control': 173,
    'hot dogColor': 'hsl(229, 70%, 50%)',
    'priviledged escalation': 83,
    burgerColor: 'hsl(296, 70%, 50%)',
    'data exfiltration': 26,
    kebabColor: 'hsl(97, 70%, 50%)',
    scan: 129,
    donutColor: 'hsl(340, 70%, 50%)',
  },
];

export const mockPieData = [
  {
    id: 'hack',
    label: 'hack',
    value: 239,
    color: 'hsl(104, 70%, 50%)',
  },
  {
    id: 'make',
    label: 'make',
    value: 170,
    color: 'hsl(162, 70%, 50%)',
  },
  {
    id: 'go',
    label: 'go',
    value: 322,
    color: 'hsl(291, 70%, 50%)',
  },
  {
    id: 'lisp',
    label: 'lisp',
    value: 503,
    color: 'hsl(229, 70%, 50%)',
  },
  {
    id: 'scala',
    label: 'scala',
    value: 584,
    color: 'hsl(344, 70%, 50%)',
  },
];

export const mockLineData = [
  {
    id: 'japan',
    color: tokens('dark').greenAccent[500],
    data: [
      {
        x: 'benign',
        y: 2048,
      },
      {
        x: 'command and control',
        y: 285,
      },
      {
        x: 'priviledged escalation',
        y: 489,
      },
      {
        x: 'data exfiltration',
        y: 725,
      },
      {
        x: 'scan',
        y: 156,
      },
      {
        x: 'password cracking',
        y: 725,
      },
      {
        x: 'webshell upload',
        y: 175,
      },
    ],
  },
  {
    id: 'france',
    color: tokens('dark').blueAccent[300],
    data: [
      {
        x: 'benign',
        y: 1740,
      },
      {
        x: 'command and control',
        y: 182,
      },
      {
        x: 'priviledged escalation',
        y: 793,
      },
      {
        x: 'data exfiltration',
        y: 823,
      },
      {
        x: 'scan',
        y: 238,
      },
      {
        x: 'password cracking',
        y: 127,
      },
      {
        x: 'webshell upload',
        y: 372,
      },
    ],
  },
  {
    id: 'us',
    color: tokens('dark').redAccent[200],
    data: [
      {
        x: 'benign',
        y: 1025,
      },
      {
        x: 'command and control',
        y: 379,
      },
      {
        x: 'priviledged escalation',
        y: 128,
      },
      {
        x: 'data exfiltration',
        y: 124,
      },
      {
        x: 'scan',
        y: 362,
      },
      {
        x: 'password cracking',
        y: 285,
      },
      {
        x: 'webshell upload',
        y: 362,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: 'AFG',
    value: 520600,
  },
  {
    id: 'AGO',
    value: 949905,
  },
  {
    id: 'ALB',
    value: 329910,
  },
  {
    id: 'ARE',
    value: 675484,
  },
  {
    id: 'ARG',
    value: 432239,
  },
  {
    id: 'ARM',
    value: 288305,
  },
  {
    id: 'ATA',
    value: 415648,
  },
  {
    id: 'ATF',
    value: 665159,
  },
  {
    id: 'AUT',
    value: 798526,
  },
  {
    id: 'AZE',
    value: 481678,
  },
  {
    id: 'BDI',
    value: 496457,
  },
  {
    id: 'BEL',
    value: 252276,
  },
  {
    id: 'BEN',
    value: 440315,
  },
  {
    id: 'BFA',
    value: 343752,
  },
  {
    id: 'BGD',
    value: 920203,
  },
  {
    id: 'BGR',
    value: 261196,
  },
  {
    id: 'BHS',
    value: 421551,
  },
  {
    id: 'BIH',
    value: 974745,
  },
  {
    id: 'BLR',
    value: 349288,
  },
  {
    id: 'BLZ',
    value: 305983,
  },
  {
    id: 'BOL',
    value: 430840,
  },
  {
    id: 'BRN',
    value: 345666,
  },
  {
    id: 'BTN',
    value: 649678,
  },
  {
    id: 'BWA',
    value: 319392,
  },
  {
    id: 'CAF',
    value: 722549,
  },
  {
    id: 'CAN',
    value: 332843,
  },
  {
    id: 'CHE',
    value: 122159,
  },
  {
    id: 'CHL',
    value: 811736,
  },
  {
    id: 'CHN',
    value: 593604,
  },
  {
    id: 'CIV',
    value: 143219,
  },
  {
    id: 'CMR',
    value: 630627,
  },
  {
    id: 'COG',
    value: 498556,
  },
  {
    id: 'COL',
    value: 660527,
  },
  {
    id: 'CRI',
    value: 60262,
  },
  {
    id: 'CUB',
    value: 177870,
  },
  {
    id: '-99',
    value: 463208,
  },
  {
    id: 'CYP',
    value: 945909,
  },
  {
    id: 'CZE',
    value: 500109,
  },
  {
    id: 'DEU',
    value: 63345,
  },
  {
    id: 'DJI',
    value: 634523,
  },
  {
    id: 'DNK',
    value: 731068,
  },
  {
    id: 'DOM',
    value: 262538,
  },
  {
    id: 'DZA',
    value: 760695,
  },
  {
    id: 'ECU',
    value: 301263,
  },
  {
    id: 'EGY',
    value: 148475,
  },
  {
    id: 'ERI',
    value: 939504,
  },
  {
    id: 'ESP',
    value: 706050,
  },
  {
    id: 'EST',
    value: 977015,
  },
  {
    id: 'ETH',
    value: 461734,
  },
  {
    id: 'FIN',
    value: 22800,
  },
  {
    id: 'FJI',
    value: 18985,
  },
  {
    id: 'FLK',
    value: 64986,
  },
  {
    id: 'FRA',
    value: 447457,
  },
  {
    id: 'GAB',
    value: 669675,
  },
  {
    id: 'GBR',
    value: 757120,
  },
  {
    id: 'GEO',
    value: 158702,
  },
  {
    id: 'GHA',
    value: 893180,
  },
  {
    id: 'GIN',
    value: 877288,
  },
  {
    id: 'GMB',
    value: 724530,
  },
  {
    id: 'GNB',
    value: 387753,
  },
  {
    id: 'GNQ',
    value: 706118,
  },
  {
    id: 'GRC',
    value: 377796,
  },
  {
    id: 'GTM',
    value: 66890,
  },
  {
    id: 'GUY',
    value: 719300,
  },
  {
    id: 'HND',
    value: 739590,
  },
  {
    id: 'HRV',
    value: 929467,
  },
  {
    id: 'HTI',
    value: 538961,
  },
  {
    id: 'HUN',
    value: 146095,
  },
  {
    id: 'IDN',
    value: 490681,
  },
  {
    id: 'IND',
    value: 549818,
  },
  {
    id: 'IRL',
    value: 630163,
  },
  {
    id: 'IRN',
    value: 596921,
  },
  {
    id: 'IRQ',
    value: 767023,
  },
  {
    id: 'ISL',
    value: 478682,
  },
  {
    id: 'ISR',
    value: 963688,
  },
  {
    id: 'ITA',
    value: 393089,
  },
  {
    id: 'JAM',
    value: 83173,
  },
  {
    id: 'JOR',
    value: 52005,
  },
  {
    id: 'JPN',
    value: 199174,
  },
  {
    id: 'KAZ',
    value: 181424,
  },
  {
    id: 'KEN',
    value: 60946,
  },
  {
    id: 'KGZ',
    value: 432478,
  },
  {
    id: 'KHM',
    value: 254461,
  },
  {
    id: 'OSA',
    value: 942447,
  },
  {
    id: 'KWT',
    value: 414413,
  },
  {
    id: 'LAO',
    value: 448339,
  },
  {
    id: 'LBN',
    value: 620090,
  },
  {
    id: 'LBR',
    value: 435950,
  },
  {
    id: 'LBY',
    value: 75091,
  },
  {
    id: 'LKA',
    value: 595124,
  },
  {
    id: 'LSO',
    value: 483524,
  },
  {
    id: 'LTU',
    value: 867357,
  },
  {
    id: 'LUX',
    value: 689172,
  },
  {
    id: 'LVA',
    value: 742980,
  },
  {
    id: 'MAR',
    value: 236538,
  },
  {
    id: 'MDA',
    value: 926836,
  },
  {
    id: 'MDG',
    value: 840840,
  },
  {
    id: 'MEX',
    value: 353910,
  },
  {
    id: 'MKD',
    value: 505842,
  },
  {
    id: 'MLI',
    value: 286082,
  },
  {
    id: 'MMR',
    value: 915544,
  },
  {
    id: 'MNE',
    value: 609500,
  },
  {
    id: 'MNG',
    value: 410428,
  },
  {
    id: 'MOZ',
    value: 32868,
  },
  {
    id: 'MRT',
    value: 375671,
  },
  {
    id: 'MWI',
    value: 591935,
  },
  {
    id: 'MYS',
    value: 991644,
  },
  {
    id: 'NAM',
    value: 701897,
  },
  {
    id: 'NCL',
    value: 144098,
  },
  {
    id: 'NER',
    value: 312944,
  },
  {
    id: 'NGA',
    value: 862877,
  },
  {
    id: 'NIC',
    value: 90831,
  },
  {
    id: 'NLD',
    value: 281879,
  },
  {
    id: 'NOR',
    value: 224537,
  },
  {
    id: 'NPL',
    value: 322331,
  },
  {
    id: 'NZL',
    value: 86615,
  },
  {
    id: 'OMN',
    value: 707881,
  },
  {
    id: 'PAK',
    value: 158577,
  },
  {
    id: 'PAN',
    value: 738579,
  },
  {
    id: 'PER',
    value: 248751,
  },
  {
    id: 'PHL',
    value: 557292,
  },
  {
    id: 'PNG',
    value: 516874,
  },
  {
    id: 'POL',
    value: 682137,
  },
  {
    id: 'PRI',
    value: 957399,
  },
  {
    id: 'PRT',
    value: 846430,
  },
  {
    id: 'PRY',
    value: 720555,
  },
  {
    id: 'QAT',
    value: 478726,
  },
  {
    id: 'ROU',
    value: 259318,
  },
  {
    id: 'RUS',
    value: 268735,
  },
  {
    id: 'RWA',
    value: 136781,
  },
  {
    id: 'ESH',
    value: 151957,
  },
  {
    id: 'SAU',
    value: 111821,
  },
  {
    id: 'SDN',
    value: 927112,
  },
  {
    id: 'SDS',
    value: 966473,
  },
  {
    id: 'SEN',
    value: 158085,
  },
  {
    id: 'SLB',
    value: 178389,
  },
  {
    id: 'SLE',
    value: 528433,
  },
  {
    id: 'SLV',
    value: 353467,
  },
  {
    id: 'ABV',
    value: 251,
  },
  {
    id: 'SOM',
    value: 445243,
  },
  {
    id: 'SRB',
    value: 202402,
  },
  {
    id: 'SUR',
    value: 972121,
  },
  {
    id: 'SVK',
    value: 319923,
  },
  {
    id: 'SVN',
    value: 728766,
  },
  {
    id: 'SWZ',
    value: 379669,
  },
  {
    id: 'SYR',
    value: 16221,
  },
  {
    id: 'TCD',
    value: 101273,
  },
  {
    id: 'TGO',
    value: 498411,
  },
  {
    id: 'THA',
    value: 506906,
  },
  {
    id: 'TJK',
    value: 613093,
  },
  {
    id: 'TKM',
    value: 327016,
  },
  {
    id: 'TLS',
    value: 607972,
  },
  {
    id: 'TTO',
    value: 936365,
  },
  {
    id: 'TUN',
    value: 898416,
  },
  {
    id: 'TUR',
    value: 237783,
  },
  {
    id: 'TWN',
    value: 878213,
  },
  {
    id: 'TZA',
    value: 442174,
  },
  {
    id: 'UGA',
    value: 720710,
  },
  {
    id: 'UKR',
    value: 74172,
  },
  {
    id: 'URY',
    value: 753177,
  },
  {
    id: 'USA',
    value: 658725,
  },
  {
    id: 'UZB',
    value: 550313,
  },
  {
    id: 'VEN',
    value: 707492,
  },
  {
    id: 'VNM',
    value: 538907,
  },
  {
    id: 'VUT',
    value: 650646,
  },
  {
    id: 'PSE',
    value: 476078,
  },
  {
    id: 'YEM',
    value: 957751,
  },
  {
    id: 'ZAF',
    value: 836949,
  },
  {
    id: 'ZMB',
    value: 714503,
  },
  {
    id: 'ZWE',
    value: 405217,
  },
  {
    id: 'KOR',
    value: 171135,
  },
];
