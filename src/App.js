import React, {Component} from "react";
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Contacts from "./components/contacts/Contacts";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import {Provider} from './context';
import NotFound from "./components/pages/NotFound";
import Test from "./components/test/Test";

// Подключаем стиль bootstrap из каталога node_modules
import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";

class App extends Component {
    render() {
        return (
            // Оборачиваем все приложение в контекст.
            // Это класс где размещается состояние.
            <Provider>

                <Router>

                    <div className="App">

                        <Header branding="Contact Manager"/>

                        <div className="container">

                            {/* <Switch> - Рендерит только первый дочерний элемент <Route> или <Redirect>,
                             который соответствует location. */ }
                            <Switch>
                                {/* exact - при значении true, будет совпадать только в том случае,
                                если путь точно соответствует location.pathname. */ }
                                <Route exact path="/" component={Contacts} />
                                <Route exact path="/contact/add" component={AddContact} />
                                <Route exact path="/contact/edit/:id" component={EditContact} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/test" component={Test} />
                                <Route component={NotFound} />
                            </Switch>

                        </div>

                    </div>

                </Router>

            </Provider>
        );
    }
}

export default App;
