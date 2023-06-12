import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleNameChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleBtnNameSubmit(this.state);
    this.setState({ name: '', number: '' });
  };
  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} number={number} name={name}>
        <label className={css.formLabel} htmlFor={nanoid()}>
          Name
          <input
            className={css.formInput}
            id={nanoid()}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleNameChange}
          />
        </label>
        <label className={css.formLabel} htmlFor={nanoid()}>
          Number
          <input
            className={css.formInput}
            id={nanoid()}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleNameChange}
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = { handleBtnNameSubmit: PropTypes.func.isRequired };