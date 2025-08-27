import Countdown from "./Countdown"
import Styledlabel from "./Styledlabel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Viewproductsbutton from "./Viewproductsbutton";

export default function SectionHeader({ redtext, headertext, timerrequired,productsref,overflowExists }) {

    function handleclickleft(){
            productsref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
    function handleclickright(){
            productsref.current.scrollBy({ left: 300, behavior: 'smooth' });
   
    }
        let timer=Countdown()
    return (
        <>
            <div className="section ">
               
                                    <Styledlabel text={redtext}></Styledlabel>
                <div className="content">
                    <div className="section-header-content">
                        <p className="Section-header">{headertext}</p>
                    {timerrequired ? <Countdown></Countdown> : ''}
                    </div>
                 <div className='apply-flex'>
                    
     {overflowExists&&<> <button className="arrows"><FontAwesomeIcon  onClick={handleclickleft} icon={faArrowLeft} /></button>
      <button className="arrows"><FontAwesomeIcon  onClick={handleclickright} icon={faArrowRight} /></button></>}

                 </div>
                </div>
                <div>


                
                </div>
            </div>
        </>
    )
}