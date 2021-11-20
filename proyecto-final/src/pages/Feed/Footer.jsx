import { BiWorld, BiCircle, BiBookmark } from 'react-icons/bi';
import classes from './Feed.module.css';

const Footer = () => {
    return (
    <footer className="bg-gray-800">
        <button>
        <BiWorld className={classes.icons} />
        </button>
        <button>
        <BiCircle className={classes.icons} />
        </button>
        <button>
        <BiBookmark className={classes.icons} />
        </button>
    </footer>
    );
}

export default Footer;