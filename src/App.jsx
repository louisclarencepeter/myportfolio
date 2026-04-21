import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import CookieBanner from './components/CookieBanner/CookieBanner.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Header/Navbar.jsx';
import './styles/App.scss';

config.autoAddCss = false;

function App() {
    return (
        <div className="App" id='home'>
            <Navbar />
            <Main />
            <Footer />
            <CookieBanner />
        </div>
    );
}

export default App;
