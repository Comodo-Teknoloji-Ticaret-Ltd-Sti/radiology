import React from 'react';
import { FiShoppingBag, FiBarChart, FiStar, FiCreditCard, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';
import product5 from './product5.jpg';
import product6 from './product6.jpg';
import product7 from './product7.jpg';
import product4 from './product4.jpg';
export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  { headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true },

  { headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true },

  { headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    isExpanded: false },

  { headerText: 'Done',
    keyField: 'Close',
    allowToggle: true },
];
const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

const gridEmployeeCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);
export const EditorData = () => (
  <div>
    <h3>
      Try React
      React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.
      </h3>
  </div>
);
const customerGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    />
    <div>
      <p>{props.CustomerName}</p>
      <p>{props.CustomerEmail}</p>
    </div>
  </div>
);

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
    <p>{props.Status}</p>
  </div>
);
export const areaPrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  majorGridLines: { width: 0 },
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
};

export const areaPrimaryYAxis = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },

};
export const barPrimaryXAxis = {
  valueType: 'Category',
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: 'transparent' },
};
const areaChartData = [
  [
    { x: new Date(2002, 0, 1), y: 2.2 },
    { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 },
    { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 },
    { x: new Date(2011, 0, 1), y: 3.1 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 2 },
    { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 },
    { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 },
    { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 0.8 },
    { x: new Date(2003, 0, 1), y: 1.3 },
    { x: new Date(2004, 0, 1), y: 1.1 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 2.3 },
    { x: new Date(2009, 0, 1), y: 2.7 },
    { x: new Date(2010, 0, 1), y: 1.1 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
];

export const areaCustomSeries = [
  { dataSource: areaChartData[0], xName: 'x', yName: 'y', name: 'USA', opacity: '0.8', type: 'SplineArea', width: '2', },
  { dataSource: areaChartData[1], xName: 'x', yName: 'y', name: 'France', opacity: '0.8', type: 'SplineArea', width: '2', },
  { dataSource: areaChartData[2], xName: 'x', yName: 'y', name: 'Germany', opacity: '0.8', type: 'SplineArea', width: '2', }
];

export const barChartData = [
  [ { x: 'USA', y: 46 }, { x: 'GBR', y: 27 }, { x: 'CHN', y: 26 }, ],
  [ { x: 'USA', y: 37 }, { x: 'GBR', y: 23 }, { x: 'CHN', y: 18 }, ],
  [ { x: 'USA', y: 38 }, { x: 'GBR', y: 17 }, { x: 'CHN', y: 26 }, ],
];

export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Gold',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Silver',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Bronze',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];
export const colorMappingData = [
  [
    { x: 'Jan', y: 6.96 },
    { x: 'Feb', y: 8.9 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17.5 },
    { x: 'May', y: 22.1 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29.4 },
    { x: 'Aug', y: 29.6 },
    { x: 'Sep', y: 25.8 },
    { x: 'Oct', y: 21.1 },
    { x: 'Nov', y: 15.5 },
    { x: 'Dec', y: 9.9 },
  ],
  ['#FFFF99'],
  ['#FFA500'],
  ['#FF4040'],
];

export const rangeColorMapping = [
  { label: '1°C to 10°C',
    start: '1',
    end: '10',
    colors: colorMappingData[1] },

  { label: '11°C to 20°C',
    start: '11',
    end: '20',
    colors: colorMappingData[2] },

  { label: '21°C to 30°C',
    start: '21',
    end: '30',
    colors: colorMappingData[3] },

];

export const ColorMappingPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°C',
  title: 'Temperature',
};

export const FinancialPrimaryXAxis = {
  valueType: 'DateTime',
  minimum: new Date('2016, 12, 31'),
  maximum: new Date('2017, 9, 30'),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: 'Price',
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}%',
  rangePadding: 'None',
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  { headerText: 'Name',
    width: '150',
    template: customerGridImage,
    textAlign: 'Center' },
  { field: 'ProjectName',
    headerText: 'Project Name',
    width: '150',
    textAlign: 'Center' },
  { field: 'Status',
    headerText: 'Status',
    width: '130',
    format: 'yMd',
    textAlign: 'Center',
    template: customerGridStatus },
  {
    field: 'Weeks',
    headerText: 'Weeks',
    width: '100',
    format: 'C2',
    textAlign: 'Center' },
  { field: 'Budget',
    headerText: 'Budget',
    width: '100',
    format: 'yMd',
    textAlign: 'Center' },

  { field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center' },

  { field: 'CustomerID',
    headerText: 'Customer ID',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

];

export const employeesGrid = [
  { headerText: 'Employee',
    width: '150',
    template: gridEmployeeProfile,
    textAlign: 'Center' },
  { field: 'Name',
    headerText: '',
    width: '0',
    textAlign: 'Center',
  },
  { field: 'Title',
    headerText: 'Designation',
    width: '170',
    textAlign: 'Center',
  },
  { headerText: 'Country',
    width: '120',
    textAlign: 'Center',
    template: gridEmployeeCountry },

  { field: 'HireDate',
    headerText: 'Hire Date',
    width: '135',
    format: 'yMd',
    textAlign: 'Center' },

  { field: 'ReportsTo',
    headerText: 'Reports To',
    width: '120',
    textAlign: 'Center' },
  { field: 'EmployeeID',
    headerText: 'Employee ID',
    width: '125',
    textAlign: 'Center' },
];
export const links = [
  // {
  //   title: 'Menü',
  //   links: [
  //     {
  //       name: 'anasayfa',
  //       icon: <FiShoppingBag />,
  //       label: 'Anasayfa',
  //     },
  //   ],
  // },
  {
    title: 'Sayfalar',
    links: [
      {
        name: 'radyoloji1',
        icon: <IoMdContacts />,
      },
      {
        name: 'radyoloji2',
        icon: <RiContactsLine />,
      },
    ],
  },
  // {
  //   title: 'Araçlar',
  //   links: [
  //     {
  //       name: 'takvim',
  //       icon: <AiOutlineCalendar />,
  //       label: 'Takvim',
  //     },
  //     {
  //       name: 'notlar',
  //       icon: <BsKanban />,
  //       label: 'Notlarım',
  //     },
  //   ],
  // },
  // {
  //   title: 'Grafikler',
  //   links: [
  //     {
  //       name: 'kalori',
  //       icon: <GiLouvrePyramid />,
  //       label: 'Kalori Takibi',
  //     },
  //   ],
  // }
];
export const cartData = [
  {
    image:
      product5,
    name: 'butterscotch ice-cream',
    category: 'Milk product',
    price: '$250',
  },
  {
    image:
      product6,
    name: 'Supreme fresh tomato',
    category: 'Vegetable Item',
    price: '$450',
  },
  {
    image:
      product7,
    name: 'Red color candy',
    category: 'Food Item',
    price: '$190',
  },
];

export const chatData = [
  {
    image:
      avatar2,
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
  },
  {
    image:
      avatar3,
    message: 'New message received',
    desc: 'Salma sent you new message',
    time: '11:56 AM',
  },
  {
    image:
      avatar4,
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
  },
  {
    image:
      avatar,
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
  },
];

export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '39,354',
    percentage: '-4%',
    title: 'Customers',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BsBoxSeam />,
    amount: '4,396',
    percentage: '+23%',
    title: 'Products',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '423,39',
    percentage: '+38%',
    title: 'Sales',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',

    pcColor: 'green-600',
  },
  {
    icon: <HiOutlineRefresh />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Refunds',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
];

export const recentTransactions = [
  {
    icon: <BsCurrencyDollar />,
    amount: '+$350',
    title: 'Paypal Transfer',
    desc: 'Money Added',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'green-600',
  },
  {
    icon: <BsShield />,
    amount: '-$560',
    desc: 'Bill Payment',
    title: 'Wallet',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    icon: <FiCreditCard />,
    amount: '+$350',
    title: 'Credit Card',
    desc: 'Money reversed',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',

    pcColor: 'green-600',
  },
  {
    icon: <TiTick />,
    amount: '+$350',
    title: 'Bank Transfer',
    desc: 'Money Added',

    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <BsCurrencyDollar />,
    amount: '-$50',
    percentage: '+38%',
    title: 'Refund',
    desc: 'Payment Sent',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
];

export const weeklyStats = [
  {
    icon: <FiShoppingCart />,
    amount: '-$560',
    title: 'Top Sales',
    desc: 'Johnathan Doe',
    iconBg: '#FB9678',
    pcColor: 'red-600',
  },
  {
    icon: <FiStar />,
    amount: '-$560',
    title: 'Best Seller',
    desc: 'MaterialPro Admin',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'red-600',
  },
  {
    icon: <BsChatLeft />,
    amount: '+$560',
    title: 'Most Commented',
    desc: 'Ample Admin',
    iconBg: '#00C292',
    pcColor: 'green-600',
  },
];

export const productsPerformance = [
  {
    image:
      product5,
    title: 'Is it good butterscotch ice-cream?',
    desc: 'Ice-Cream, Milk, Powder',
    rating: 'Good',
    itemSold: '65%',
    earningAmount: '$546,000',
  },
  {
    image:
      product6,
    title: 'Supreme fresh tomato available',
    desc: 'Market, Mall',
    rating: 'Excellent',
    itemSold: '98%',
    earningAmount: '$780,000',
  },
  {
    image:
      product7,
    title: 'Red color candy from Gucci',
    desc: 'Chocolate, Yummy',
    rating: 'Average',
    itemSold: '46%',
    earningAmount: '$457,000',
  },
  {
    image:
      product4,
    title: 'Stylish night lamp for night',
    desc: 'Electric, Wire, Current',
    rating: 'Poor',
    itemSold: '23%',
    earningAmount: '$123,000',
  },
];

export const medicalproBranding = {
  data: [
    {
      title: 'Due Date',
      desc: 'Oct 23, 2021',
    },
    {
      title: 'Budget',
      desc: '$98,500',
    },
    {
      title: 'Expense',
      desc: '$63,000',
    },
  ],
  teams: [
    {
      name: 'Bootstrap',
      color: 'orange',
    },
    {
      name: 'Angular',
      color: '#FB9678',
    },
  ],
  leaders: [
    {
      image:
        avatar2,
    },
    {
      image:
        avatar3,
    },
    {
      image:
        avatar2,
    },
    {
      image:
        avatar4,
    },
    {
      image:
        avatar,
    },
  ],
};

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];

export const ordersGrid = [
  {
    headerText: 'Image',
    template: gridOrderImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'OrderItems',
    headerText: 'Item',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'CustomerName',
    headerText: 'Customer Name',
    width: '150',
    textAlign: 'Center' },
  {
    field: 'TotalAmount',
    headerText: 'Total Amount',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    headerText: 'Status',
    template: gridOrderStatus,
    field: 'OrderItems',
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'OrderID',
    headerText: 'Order ID',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center',
  },
];

export const customersData = [
  {
    CustomerID: 1001,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerImage:
      avatar2,
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1002,

    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    CustomerImage:
      avatar3,

    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
  {
    CustomerID: 1003,

    CustomerName: 'Andrew McDownland',
    CustomerEmail: 'andrew@gmail.com',
    ProjectName: 'Real Homes WP Theme',
    Status: 'Pending',
    CustomerImage:
      avatar4,
    StatusBg: '#FEC90F',
    Weeks: '19',
    Budget: '$24.5k',
    Location: 'USA',
  },
];

export const employeesData = [
  {
    EmployeeID: 1,
    Name: 'Nancy Davolio',
    Title: 'Sales Representative',
    HireDate: '01/02/2021',
    Country: 'USA',
    ReportsTo: 'Carson',
    EmployeeImage:
    avatar3,
  },
];

export const ordersData = [
  {
    OrderID: 10248,
    CustomerName: 'Vinet',

    TotalAmount: 32.38,
    OrderItems: 'Fresh Tomato',
    Location: 'USA',
    Status: 'pending',
    StatusBg: '#FB9678',
    ProductImage:
      product6,
  },
];

export const scheduleData = [
  {
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    Location: 'Space Center USA',
    StartTime: '2021-01-10T04:00:00.000Z',
    EndTime: '2021-01-10T05:30:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 2,
    Subject: 'Thule Air Crash Report',
    Location: 'Newyork City',
    StartTime: '2021-01-11T06:30:00.000Z',
    EndTime: '2021-01-11T08:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 3,
    Subject: 'Blue Moon Eclipse',
    Location: 'Space Center USA',
    StartTime: '2021-01-12T04:00:00.000Z',
    EndTime: '2021-01-12T05:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 4,
    Subject: 'Meteor Showers in 2021',
    Location: 'Space Center USA',
    StartTime: '2021-01-13T07:30:00.000Z',
    EndTime: '2021-01-13T09:00:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 5,
    Subject: 'Milky Way as Melting pot',
    Location: 'Space Center USA',
    StartTime: '2021-01-14T06:30:00.000Z',
    EndTime: '2021-01-14T08:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 6,
    Subject: 'Mysteries of Bermuda Triangle',
    Location: 'Bermuda',
    StartTime: '2021-01-14T04:00:00.000Z',
    EndTime: '2021-01-14T05:30:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 7,
    Subject: 'Glaciers and Snowflakes',
    Location: 'Himalayas',
    StartTime: '2021-01-15T05:30:00.000Z',
    EndTime: '2021-01-15T07:00:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 8,
    Subject: 'Life on Mars',
    Location: 'Space Center USA',
    StartTime: '2021-01-16T03:30:00.000Z',
    EndTime: '2021-01-16T04:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 9,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-18T05:30:00.000Z',
    EndTime: '2021-01-18T07:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 10,
    Subject: 'Wildlife Galleries',
    Location: 'Africa',
    StartTime: '2021-01-20T05:30:00.000Z',
    EndTime: '2021-01-20T07:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];
export const dropdownData = [
  {
    Id: '1',
    Time: 'March 2021',
  },
  {
    Id: '2',
    Time: 'April 2021',
  }, {
    Id: '3',
    Time: 'May 2021',
  },
];
export const SparklineAreaData = [
  { x: 1, yval: 2 },
  { x: 2, yval: 6 },
  { x: 3, yval: 8 },
  { x: 4, yval: 5 },
  { x: 5, yval: 10 },

];

export const lineCustomSeries = [
  { dataSource: lineChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Germany',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'England',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'India',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

];

export const pieChartData = [
  { x: 'Labour', y: 18, text: '18%' },
  { x: 'Legal', y: 8, text: '8%' },
  { x: 'Production', y: 15, text: '15%' },
  { x: 'License', y: 11, text: '11%' },
  { x: 'Facilities', y: 18, text: '18%' },
  { x: 'Taxes', y: 14, text: '14%' },
  { x: 'Insurance', y: 16, text: '16%' },
];

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];

export const ecomPieChartData = [
  { x: '2018', y: 18, text: '35%' },
  { x: '2019', y: 18, text: '15%' },
  { x: '2020', y: 18, text: '25%' },
  { x: '2021', y: 18, text: '25%' },
];

export const stackedChartData = [
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
];

export const stackedCustomSeries = [

  { dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',

  },

  { dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',

  },

];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

export const kanbanData = [
  {
    Id: 'Task 1',
    Title: 'Task - 29001',
    Status: 'Open',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Analyze,Customer',
    Estimate: 3.5,
    Assignee: 'Nancy Davloio',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-nancy-davloio',
  },
  {
    Id: 'Task 2',
    Title: 'Task - 29002',
    Status: 'InProgress',
    Summary: 'Improve application performance',
    Type: 'Improvement',
    Priority: 'Normal',
    Tags: 'Improvement',
    Estimate: 6,
    Assignee: 'Andrew Fuller',
    RankId: 1,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-normal, e-andrew-fuller',
  },
  {
    Id: 'Task 3',
    Title: 'Task - 29003',
    Status: 'Open',
    Summary: 'Arrange a web meeting with the customer to get new requirements.',
    Type: 'Others',
    Priority: 'Critical',
    Tags: 'Meeting',
    Estimate: 5.5,
    Assignee: 'Janet Leverling',
    RankId: 2,
    Color: '#1F88E5',
    ClassName: 'e-others, e-critical, e-janet-leverling',
  },
  {
    Id: 'Task 4',
    Title: 'Task - 29004',
    Status: 'InProgress',
    Summary: 'Fix the issues reported in the IE browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'IE',
    Estimate: 2.5,
    Assignee: 'Janet Leverling',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-janet-leverling',
  },
  {
    Id: 'Task 5',
    Title: 'Task - 29005',
    Status: 'Review',
    Summary: 'Fix the issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Low',
    Tags: 'Customer',
    Estimate: '3.5',
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#E64A19',
    ClassName: 'e-bug, e-low, e-steven-walker',
  },
];

export const financialChartData = [
  {
    x: new Date('2012-04-02'),
    open: 85.9757,
    high: 90.6657,
    low: 85.7685,
    close: 90.5257,
    volume: 660187068,
  },
  {
    x: new Date('2012-04-09'),
    open: 89.4471,
    high: 92,
    low: 86.2157,
    close: 86.4614,
    volume: 912634864,
  },
  {
    x: new Date('2012-04-16'),
    open: 87.1514,
    high: 88.6071,
    low: 81.4885,
    close: 81.8543,
    volume: 1221746066,
  },
];
export const PyramidData = [
  { x: 'Sweet Treats', y: 120, text: '120 cal' },
  { x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
  { x: 'Vegetables', y: 470, text: '470 cal' },
  { x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
  { x: 'Fruits', y: 520, text: '520 cal' },
  { x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' },
];
