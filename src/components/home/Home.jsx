import React from 'react'
import Banner from './Banner.jsx';
import HomeCategory from './HomeCategory.jsx';
import CategoryShowCase from './CategoryShowCase.jsx';
import Register from './Register.jsx';

const Home = () => {
  return (
    <div>
       <Banner />
       <HomeCategory />
       <CategoryShowCase />
       <Register />
      
    </div>
  )
}

export default Home