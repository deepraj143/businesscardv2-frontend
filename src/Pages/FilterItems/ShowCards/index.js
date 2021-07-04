import React,{useState} from 'react';
import T1 from '../../Alltemp/T1/Temp1'
import T2 from  '../../Alltemp/T2'
import T3 from  '../../Alltemp/T3'
import T4 from  '../../Alltemp/T4'
import T5 from  '../../Alltemp/T5'
import T6 from  '../../Alltemp/T6'
import T7 from  '../../Alltemp/T7'

const ShowCards = ({ cards,filterID,withRadio,setchecktemplateHandler }) => {

  const templates = {
    '<T1/>' : <T1 data={null}/>,
    '<T2/>' : <T2 data={null}/>,
    '<T3/>' : <T3 data={null}/>,
    '<T4/>' : <T4 data={null}/>,
    '<T5/>' : <T5 data={null}/>,
    '<T6/>' : <T6 data={null}/>,
    '<T7/>' : <T7 data={null}/>
  }

  const [check, setcheck] = useState()
  const handleChange = e => {
    if(setchecktemplateHandler !== undefined)
    {
      setchecktemplateHandler(e.target.value)
    }
    setcheck(e.target.value)   
  }

  return (
    <div className='section-center'>
      {cards.length!== undefined  && cards.map((card) => {
        return (
          <article key={card.template_id} className={(filterID === card.template_category_template_category.category_id) ?"d-none menu-item":"menu-item"}>
            {templates[card.template_identity]}
            <div className={(withRadio === true) ? "":"d-none"}>
              <input required type='radio' checked={card.template_id.toString() === check}  onChange={(e)=>handleChange(e)} name={"cardTemplate"}  value={card.template_id} className={(card.template_id === 6 || card.template_id === 7) ? "special-margin mt-5":"mt-5"}/><label style={{fontSize:'22px',fontWeight:'bold'}} htmlFor="">&nbsp;{card.template_name}</label>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ShowCards;