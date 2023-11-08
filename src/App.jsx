import '@fortawesome/fontawesome-free/css/all.css';
import Main from './components/main/Main.jsx';
import Footer from './components/footer/Footer.jsx';
import Navbar from './components/header/Navbar.jsx';
import './styles/App.scss';

function App() {
    return (
        <div className="App" id='home'>
            <Navbar />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
