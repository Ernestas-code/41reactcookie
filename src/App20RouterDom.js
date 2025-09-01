import React from 'react';
import AboutUsPage from './Pages/AboutUsPage';
import HomePage from './Pages/HomePage';
import GalleryPage from './Pages/GalleryPage';
import ProductPage from './Pages/ProductPage';
import Toolbar from "./components/Toolbar";
import SingleProductPage from "./components/SingleProductPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
const App20RouterDom = () => {
    return (
        <div className="App">
<BrowserRouter>
    <Toolbar/>
    <Routes>
        <Route path ="/" element = {<HomePage/>}/>
        <Route path ="/AboutUs/:color" element = {<AboutUsPage/>}/>
        <Route path ="/gallery" element = {<GalleryPage/>}/>
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ProductPage/product/:productId" element={<SingleProductPage />} />

    </Routes>
</BrowserRouter>
        </div>
    );
};

export default App20RouterDom;