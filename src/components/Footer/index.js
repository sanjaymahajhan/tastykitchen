import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer_container">
    <div className="footer_website_logo_container ">
      <img
        src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686575089/Vector_2x_gen41h.png"
        alt="website-footer-logo"
        className="footer_img"
      />
      <h1 className="footer_heading">Tasty Kitchens</h1>
    </div>
    <p className="footer_para">
      The only thing we are serious about is food. <br /> Contact us on
    </p>
    <ul className="footer_react_icon_container">
      <li>
        <FaPinterestSquare
          size={25}
          color="#ffffff"
          testid="pintrest-social-icon"
        />
      </li>
      <li>
        <FaInstagram size={25} color="#ffffff" testid="instagram-social-icon" />
      </li>
      <li>
        <FaTwitter size={25} color="#ffffff" testid="twitter-social-icon" />
      </li>
      <li>
        <FaFacebookSquare
          size={25}
          color="#ffffff"
          testid="facebook-social-icon"
        />
      </li>
    </ul>
  </div>
)

export default Footer
