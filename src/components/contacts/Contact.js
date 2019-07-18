import React, {Component} from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {Consumer} from '../../context';
import axios from 'axios';

class Contact extends Component {

    state = {
        showContactInfo: false
    };

    // Эту стрелочную функцию нельзя назначать как async.
    // Нужно поставить async перед параметрами.
    onDeleteClick = async (id, dispatch) => {
         await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        // Вызываем функцию dispatch() в состоянии
        dispatch({type: 'DELETE_CONTACT', payload: id});
    };

    render() {

        // this.props.contact или
        const {id, name, email, phone} = this.props["contact"];
        const {showContactInfo} = this.state;

        return (
            // Потребитель
            <Consumer>
                {value => {
                    // value - это состояние из файла context.js.
                    // Получаем dispatch из состояния.
                    const {dispatch} = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>{name} {' '}

                                <i className="fas fa-sort-down"
                                   onClick={() => this.setState({showContactInfo: !this.state.showContactInfo})}
                                   style={{cursor: 'pointer'}}
                                />

                                <i className="fas fa-times"
                                   style={{cursor: 'pointer', float: 'right', color: 'red'}}
                                   // Передаем id и свойство dispatch (это функция действия) из состояния,
                                    // методу onDeleteClick() этого класса.
                                   onClick={this.onDeleteClick.bind(this, id, dispatch)}
                                />

                                <Link to={`contact/edit/${id}`}>
                                    <i
                                        className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black',
                                            marginRight: '1rem'
                                        }}
                                    />
                                </Link>
                                
                            </h4>
                            {showContactInfo &&
                            (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            )
                            }

                        </div>
                    )
                }}
            </Consumer>
        );

    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default Contact;
