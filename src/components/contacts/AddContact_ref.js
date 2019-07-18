import React, {Component} from 'react';

class AddContact_ref extends Component {

    constructor(props) {
        super(props);
        // Создаем ссылки ref, или свойства которые будут содержать элементы поля.
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    onSubmit = e => {
        // Чтобы отменить отправку формы
        e.preventDefault();
        const contact = {
            // Так можно получить значение элемента поля
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
        };
        console.log(contact);
    };

    // Props по-умолчанию
    static defaultProps = {
        name: 'Fred Smith',
        email: 'fred@gmail.com',
        phone: '900-100-2000'
    };

    render() {
        const {name, email, phone} = this.props;
        return (
            // mb-3 - margin-bottom: 3px
            <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control form-control-lg"
                                placeholder="Enter Name"
                                defaultValue={name}
                                // Устанавливаем this.nameInput равным этому элементу
                                ref={this.nameInput}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control form-control-lg"
                                placeholder="Enter Email"
                                defaultValue={email}
                                ref={this.emailInput}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control form-control-lg"
                                placeholder="Enter Phone"
                                defaultValue={phone}
                                ref={this.phoneInput}
                            />
                        </div>

                        <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>

                    </form>
                </div>
            </div>
        );
    }
}

export default AddContact_ref;