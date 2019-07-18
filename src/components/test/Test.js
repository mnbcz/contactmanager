import React, {Component} from 'react';

class Test extends Component {

    state = {
        title: '',
        body: ''
    };

    // Компонент был смонтирован.
    // Этот метод вызывается когда компонент был смонтирован в DOM.
    // В этом методе обычно посмещаются запросы к серверу чтобы установить данные в компонент.
    componentDidMount() {

        // this - уже доступно здесь и равно этому классу Test.
        // Поскольку метд componentDidMount() встроенный, уже определен в классе Component.

        console.log('componentDidMount()');

        fetch('https://jsonplaceholder.typicode.com/posts/1')
          .then(response => response.json())
          .then(data =>
            this.setState({
              title: data.title,
              body: data.body
            })
          );
    }

    render() {
        const {title, body} = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        );
    }
}

export default Test;
