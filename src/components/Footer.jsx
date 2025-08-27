import qrcodeimg from '../assets/Qr Code.png'
import googleplayimg from '../assets/googleplay.png'
import appstoreimg from '../assets/appstore.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import RoundedIcon from './RoundedIcon'

export default function Fotter() {
    return (
        <footer>
            <div className="footer-container">
            <div className="footer-section-container">
                <h2>Exclusive</h2>
                <ul>
                    <li><h3>Subscribe</h3></li>
                    <li>Get 10% off your first order</li>
                    <li className='inputandiconcontainer'><input type="email" placeholder="Enter your Email"></input>
                    <FontAwesomeIcon className='telegramIcon' icon={faTelegramPlane} />

                    </li>
                </ul>
            </div>
            <div className="footer-section-container">
                <h2>Support</h2>
                <ul>
                    <li>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</li>
                    <li>exclusive@gmail.com</li>
                    <li>+88015-88888-9999</li>


                </ul>
            </div>
            <div className="footer-section-container">
                <h2>Account</h2>
                <ul>
                    <li>My Account</li>
                    <li>Login / Register</li>
                    <li>Cart</li>
                    <li>Wishlist</li>
                    <li>Shop</li>
                </ul>
            </div>
            <div className="footer-section-container">
                <h2>Quick Link</h2>
                <ul>
                    <li>Privacy Policy</li>
                    <li>Terms Of Use</li>
                    <li>FAQ</li>
                    <li>Contact</li>

                </ul>
            </div>
            <div className="footer-section-container">
                <h2>Download App</h2>
                <ul>
                    <li>Save $3 with App New User Only</li>
                    <li>
                        <div className="footer-icons-container">
                            <img src={qrcodeimg}></img>
                            <div className="inside-footer-icons-container">
                               <img src={googleplayimg}></img>
                                <img src={appstoreimg}></img>
                            </div>
                        </div>
                    </li>
                    <li className="social-icons">
      <FontAwesomeIcon icon={faFacebook} />
      <FontAwesomeIcon icon={faTwitter} />
      <FontAwesomeIcon icon={faInstagram} />
      <FontAwesomeIcon icon={faLinkedin} />
     
                    </li>

                </ul>
            </div>
            </div>
            <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </footer>
    )
}