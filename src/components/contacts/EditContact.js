import React, {Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

class EditContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        // Сообщения ошибок вида:
        // {name: 'Name is required'}
        errors: {}
    };


    async componentDidMount() {

        const { id } = this.props.match.params;
        const res = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });

    }


    onSubmit = async (dispatch, e) => {
        // Чтобы отменить отправку формы
        e.preventDefault();
        const {name, email, phone} = this.state;

        // Check for errors. Проверка значений полей.
        if (name === '') {
            this.setState({errors: {name: 'Name is required'}});
            return;
        }
        if (email === '') {
            this.setState({errors: {email: 'Email is required'}});
            return;
        }
        if (phone === '') {
            this.setState({errors: {phone: 'Phone is required'}});
            return;
        }

        // Что сохранить в базе данных
        const updContact = {
            name,
            email,
            phone
        };

        // Получаем id из маршрута
        const {id} = this.props.match.params;

        // Обновляем данные в базе данных
        const res = await axios.put(
            `https://jsonplaceholder.typicode.com/users/${id}`,
            updContact
        );

        // Обновим список пользователей
        dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

        // Clear State
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // Перенаправляем на страницу /
        // На самом деле не будет никакого перенаправления на другую страницу,
        // это перенаправление работает только в приложении React.
        this.props.history.push('/');

    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        const {name, email, phone, errors} = this.state;

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        // mb-3 - margin-bottom: 3px
                        <div className="card mb-3">
                            <div className="card-header">Edit Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />

                                    <TextInputGroup
                                        label="Email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />

                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />

                                    <input type="submit" value="Update Contact" className="btn btn-light btn-block"/>

                                </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>

        );
    }
}

export default EditContact;