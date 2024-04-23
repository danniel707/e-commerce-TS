import { Outlet } from 'react-router-dom'
import ScrollTopButton from '../../components/scroll-top-button/scroll-top-button.component';

import Directory from '../../components/directory/directory.component'

const Home = () => {

  return (
    <div>
      <Outlet/>
      <Directory  />
      <ScrollTopButton />
    </div>
  );
}

export default Home;
