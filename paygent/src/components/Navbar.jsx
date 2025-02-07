import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
function Navbar(){
    return(
    <>
        <div className="navbar-container">
            <header className='header'>
            <nav className='navbar'>
                <div className="logo">
                PAIgent
                </div>
                <ul>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    <Link to="/projects">Explore</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                </ul>
            </nav>
            <ConnectButton />
            </header>
        </div>
    </>)
}

export default Navbar