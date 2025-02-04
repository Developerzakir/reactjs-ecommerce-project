import React from 'react'
import Banner from './Banner.jsx';
import HomeCategory from './HomeCategory.jsx';
import CategoryShowCase from './CategoryShowCase.jsx';
import Register from './Register.jsx';
import LocationSprade from './LocationSprade.jsx';

const Home = () => {
  return (
    <div>
       <Banner />
       <HomeCategory />
       <CategoryShowCase />
       <Register />
       <LocationSprade />
      
    </div>
  )
}

export default Home