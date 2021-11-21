import { BiWorld, BiCircle, BiBookmark } from 'react-icons/bi';
import classes from './Feed.module.css';

const Footer = ({changeTab = () => {}}) => {
    return (
    <footer className="bg-gray-800">
        <button onClick={() => changeTab(1)}>
        <BiWorld className={classes.icons} />
        </button>
        <button>
        <BiCircle className={classes.icons} />
        </button>
        <button onClick={() => changeTab(2)}>
        <BiBookmark className={classes.icons} />
        </button>
    </footer>
    );
}

export default Footer;