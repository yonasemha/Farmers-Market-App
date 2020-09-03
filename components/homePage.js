import React from 'react';
import img7 from './images/img7.jpg';
import img8 from './images/img8.jpg';
import img6 from './images/img6.jpg';

import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: img6,
    caption: `Mekeret.com is a place where convenience and value meet for international food lovers.
     We provide a variety of the best value food products.  
     We aim to make Mekeret.com your one-stop shopping place for your international food items`,
    header: 'Convient way of buying food during COVID-19',
    key: '1'
  },
  {
    src: img7,
    altText: 'slide 2',
    caption: `At Mekeret we pride ourselves in providing fast and convenient shopping and delivery services. 
    `,
    header: 'Order food from anywhere, to anywhere',
    key: '2'
  },
  {
    src: img8,
    altText: 'Slide 3',
    caption: `Get all the convenience …. with more discounts and more selections.*`,
    header: 'Order food online with peace of mind',
    key: '3'
  }
];

const Home = () =><div>

 <UncontrolledCarousel items={items} />
 </div> ;

export default Home;