
import side_image from '../assets/Side Image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStore,
    faDollarSign,
    faShoppingBag,
    faBullseye
} from '@fortawesome/free-solid-svg-icons';
import Services from './Services';
export default function Aboutpage() {
    return (<>
        <div className="about-container">
            <div className="container">
                <h1>Our Story</h1>
                <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
            </div>
            <div className="side-image">
                <img src={side_image} alt="" />
            </div>
        </div>
        <div className="container stats-container">
            <div className='stats-box'>
                <div className="box-container">
                    <div className="icon-container">
                        <FontAwesomeIcon className='servicesIcons' icon={faStore} size="2x" />
                    </div>
                    <h2>10.5k</h2>
                    <p>Sallers active our site</p>
                </div>
                 <div className="box-container">
                    <div className="icon-container">
                        <FontAwesomeIcon className='servicesIcons' icon={faDollarSign} size="2x" />
                    </div>
                    <h2>33k</h2>
                    <p>Mopnthly Produduct Sale</p>
                </div>
                 <div className="box-container">
                    <div className="icon-container">
                        <FontAwesomeIcon className='servicesIcons' icon={faShoppingBag} size="2x" />
                    </div>
                    <h2>25k</h2>
                    <p>Customer active in our site</p>
                </div>
                 <div className="box-container">
                    <div className="icon-container">
                        <FontAwesomeIcon className='servicesIcons' icon={faBullseye} size="2x" />
                    </div>
                    <h2>10.5k</h2>
                    <p>Anual gross sale in our site</p>
                </div>
            </div>
            <Services></Services>
        </div>
    </>
    )
}