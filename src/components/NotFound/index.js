import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not_found_container">
    <img
      src="https://res.cloudinary.com/dpa9t5hi6/image/upload/v1686748370/erroring_1_euzehu.jpg"
      alt="not found"
      className="not_found_img"
    />
    <h1 className="not_found_heading">Page Not Found</h1>
    <p className="not_found_para">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="not_found_link">
      <button type="button" className="not_found_home_page">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
