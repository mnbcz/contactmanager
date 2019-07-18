import React from 'react';
import PropTypes from 'prop-types';
// Для работы с классами CSS
import classnames from 'classnames';

// Параметр props - этот объект разбирается в переменные (деструкторизация)
const TextInputGroup = ({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    error
    }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                // Если css класс содержит класс 'is-invalid': class="is-invalid form-control form-control-lg",
                // то элемент с классом 'invalid-feedback' <div className="invalid-feedback">{error}</div>}
                // будет отображаться. Если не содержит класс 'is-invalid', то не будет отображаться.
                // Первый параметр classnames() - это имена классов css которые должны быть установлены
                // по-умолчанию. Не зависимо от условия.
                // Второй параметр - это объект, который содержит в ключе имя класса css,
                // значение - это условие, от которого зависит добавление этого класса.
                className={classnames('form-control form-control-lg',
                    {'is-invalid': error}
                    )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            {error && <div className="invalid-feedback">{error}</div>}

        </div>
    );
};

TextInputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

TextInputGroup.defaultProps = {
    type: 'text'
};

export default TextInputGroup;