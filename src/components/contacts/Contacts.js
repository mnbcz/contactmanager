import React, {Component} from "react";
import Contact from './Contact';
import {Consumer} from '../../context';

class Contacts extends Component {

    render() {
        return (
            // Потребитель
            <Consumer>
                {value => {
                    // value - был установлен раньше в файле context.js (<Context.Provider value={this.state}>).
                    // value - это состояние.
                    const {contacts} = value;
                    return (
                        <React.Fragment>
                            <h1 className="display-4 mb-2">
                                <span className="text-danger">Contact</span> List
                            </h1>
                            {contacts.map(contact => (
                                <Contact
                                    key={contact.id}
                                    contact={contact}
                                />
                            ))}
                        </React.Fragment>
                    );
                }}
            </Consumer>
        );

    }

}

export default Contacts;