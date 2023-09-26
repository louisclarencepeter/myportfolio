import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import './styles/App.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from './components/Header/Navbar.jsx';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
