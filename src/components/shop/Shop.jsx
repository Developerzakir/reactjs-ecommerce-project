import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import Data from '../../products.json'
import ProductCards from './ProductCards'
import Pagination from './Pagination'
import Search from './Search'

const showResults = "Showing 01 - 12 of 140 Results"

const Shop = () => {
    const [gridList, setGridList] = useState(true);
    const [products, setProducts] = useState(Data);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerpage = 12;

    const indexOfLastProduct = currentPage * productsPerpage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerpage;
    const currentProducts = products.slice(indexOfFirstProduct,indexOfLastProduct);

 //function to change the current page
 const paginate = (pageNumber)=>{
    setCurrentPage(pageNumber);
 }



  return (
    <div>
        <PageHeader title="Our Shop Page" curPage="Shop" />
        <div className='shop-page padding-tb'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-12">
                       <article>
                          <div className="shop-title d-flex flex-warp justify-content-between">
                                <p>{showResults}</p>
                                <div className={`product-view-mode ${gridList ? "gridActive" : "listActive"}`}>
                                    <a  className='grid' onClick={()=>setGridList(!gridList)}>
                                        <i className='icofont-ghost'></i>
                                    </a>
                                    <a  className='list' onClick={()=>setGridList(!gridList)}>
                                        <i className='icofont-listine-dots'></i>
                                    </a>
                                </div>
                          </div>

                          <div>
                            <ProductCards  gridList={gridList} products={currentProducts}/>
                          </div>
                          <Pagination
                                productsPerpage={productsPerpage}
                                totalProducts={products.length}
                                paginate={paginate}
                                activePage={currentPage}
                           />

                       </article>
                    </div>
                    <div className="col-lg-4 col-12">
                        <aside>
                            <Search products={products} gridList={gridList} />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shop