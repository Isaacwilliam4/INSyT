import { useContext, useState } from 'react';
import logo from '../imgs/logo.png';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  
  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const [userNavPanel, setUserNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };


  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='flex-none h-10'>
          <img src={logo} className='w-full' />
        </Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
