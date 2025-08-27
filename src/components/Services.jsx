import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'

export default function Services (){
return (
    <div  style={{marginTop:'200px',marginBottom:'200px'}} className='container services'>
        <div className='service-container'>
            <div className='icon-container'><FontAwesomeIcon className={"servicesIcons"} icon={faHeadset} /></div>
            <h3>24/7 CUSTOMER SERVICE</h3>
            <p>Friendly 24/7 customer support</p>

            </div>
        <div  className='service-container'>
             <div className='icon-container'><FontAwesomeIcon className={"servicesIcons"} icon={faTruckFast} />  </div>

                         <h3>FREE AND FAST DELIVERY</h3>            
            <p>Free delivery for all orders over $140</p>
             </div> 
        <div>
          <div  className='service-container'> <div className="icon-container"> <FontAwesomeIcon className={"servicesIcons"} icon={faCircleDollarToSlot} /> </div>
            <h3>MONEY BACK GUARANTEE</h3>
            <p>We reurn money within 30 days</p>
            </div>
            </div>
      </div>
)
}