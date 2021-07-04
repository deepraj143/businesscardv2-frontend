import React from 'react'
import {GiNetworkBars} from 'react-icons/gi'
import {MdStyle} from 'react-icons/md'
import {AiOutlinePicLeft} from 'react-icons/ai'
import {GrInstall} from 'react-icons/gr'
const Categories = ({ categories, filterItems }) => {
    return (
      <div className="btn-container mt-3">
        {/* <p className="mb-2">Filter By :</p> */}
        <p key={0} buttonStyle="btn--primary" className="text-left mb-3 cursor-pointer border-bottom-custom" variant="white" buttonSize="btn--medium" onClick={() => filterItems(0)}><GrInstall/> Show All</p>
        {categories.map((el) => {
          let icon = null;
          // console.log(el.category_name)
          if(el.category_name === 'Professional') icon = <GiNetworkBars/>
          if(el.category_name === 'Fancy') icon = <MdStyle />
          if(el.category_name === 'Simple') icon = <AiOutlinePicLeft/>
          return (
            <p key={el.category_id} buttonStyle="btn--primary" className="text-left mb-3 cursor-pointer border-bottom-custom" variant="white" buttonSize="btn--medium" onClick={() => filterItems(el.category_id)}>{icon}&nbsp;{el.category_name}</p>
          );
        })}
      </div>
    );
  };

export default Categories
