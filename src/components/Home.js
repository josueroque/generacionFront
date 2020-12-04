import React, { Fragment} from 'react';
import Menu from './Menu';
import Imagen from '../img/logo_ods.png';
function Home(){

  return  (
        <Fragment>
            <Menu></Menu>
            <img src={Imagen} alt="logo ODS" className="Logo"></img>
        </Fragment>
    )
};

export default Home;