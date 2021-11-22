import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router';
import classes from './User.module.css';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const User = () => {
    const navigate = useNavigate();
    const { logout } = useUserContext();

    const onLogOutHandler = () => {
        logout();
        navigate("/login");
    }

    return (
    <main className="bg-indigo-900 h-screen">
        <header className={classes.dCenter}>
        <h1 className="text-white">User</h1>
        <div className={classes.returnSection}>
            <Link to="/feed">
                <MdOutlineArrowBackIosNew className={classes.iconReturn} />
            </Link>
        </div>
        </header>
        <div className={`h-screen ${classes.userPage}`}>
            <h2>Wellcome!!</h2>
            <h3>user_test@</h3>
        </div>
        <div className={classes.logOut}>
            <button type="button" className={`rounded-lg ${classes.logOutButton}`} onClick={() => onLogOutHandler()}>Log out</button>
        </div>
    </main>
    );
}

export default User;