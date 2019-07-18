import React, {Component} from 'react';
import axios from 'axios';

// В этом файле создаем компонент Provider с состоянием contacts.
// Метод render() этого компонента будет возвращать Context.Provider.

const Context = React.createContext();

// Определяем действия с состоянием, например удаление элемента.
// Поступает активное состояние, и действие с ключами: type и payload.
// Возвращает объект нового состояния.
const reducer = (state, action) => {
    switch (action.type) {

        // Удаление элемента Contact из списка Contacts
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact =>
                    contact.id !== action.payload
                )
            };

        // Добавление элемента Contact в список Contacts
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };

        // Обновление записи
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(
                    contact =>
                        contact.id === action.payload.id
                            ? action.payload
                            : contact
                )
            };
        default:
            return state;
    }
};

/**
 * В этом классе размещается состояние.
 * Состояние содержит свойства:
 * contacts - список контактов,
 * dispatch - функция с аргументом action, которая изеняет состояние этого класса.
 * Состояние изменяет функция reducer, которая объявлена выше, которая должна вернуть
 * новое состояние.
 */
export class Provider extends Component {
    state = {
        contacts: [],
        // Здесь автоматически в функцию setState() аргументом передается активное состояние.
        // Стрелочная функция в setState() должна вернуть новое состояние.
        dispatch: action => this.setState(state => reducer(state, action))
    };

    // Это асинхронный метод, выполнение этого метода ждать не нужно.
    async componentDidMount() {
        // Ждем пока не получим ответ

        //   axios.get('https://jsonplaceholder.typicode.com/users')
        //     .then(res => this.setState({ contacts: res.data}));

        // await - ожидать ответа, а не выполнять следующую строку
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({contacts: res.data});
    }

    render() {
        return (
            // Устанавливаем значение для поставщика данных в атрибуте value.
            // Потом можно получить это значение, везде во вложенных компонентах,
            // через
            // <Context.Consumer>
            //    {value => {}}
            // </Context.Consumer>
            // value - это будет значение указанное в  <Context.Provider value={this.state}>.
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }

}

// Чтобы не использовать длинное имя Context.Consumer,
// установим переменную Consumer с этим значением Context.Consumer.
// Это потребитель.
export const Consumer = Context.Consumer;

