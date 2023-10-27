import './App.css';
import './OauthComponent'
import {FacebookOauthComponent, GoogleOauthComponent} from "./OauthComponent";

function App() {
    return (
        <div>
            <FacebookOauthComponent/>
            <GoogleOauthComponent/>
        </div>
    );
}

export default App;
