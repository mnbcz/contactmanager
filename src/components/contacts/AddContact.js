import React, {Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        // Сообщения ошибок вида:
        // {name: 'Name is required'}
        errors: {}
    };

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
        // ES6. Это то же самое что и newContact = {name: name, .... }
        const newContact = {
            name,
            email,
            phone
        };

        // Добавляем пользователя в базу данных.
        // Указываем урл и объект нового пользователя.
        // В ответе должен быть объект с ключами равными полям добавленной записи,
        // Поле id должно быть на 1 больше чем предыдущее. Эти данные будут в payload: res.data.
        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);

        dispatch({type: 'ADD_CONTACT', payload: res.data});

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
                            <div className="card-header">Add Contact</div>
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

                                    <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>

                                </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>

        );
    }
}

export default AddContact;