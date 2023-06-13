import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleNameChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleBtnNameSubmit = data => {
    const { contacts } = this.state;
    const isInclude = contacts.find(contact => contact.name === data.name);

    if (isInclude) {
      Report.info(data.name + ' Is already in contacts!');
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: data.name, id: nanoid(), number: data.number },
      ],
    }));
  };
  getVisibleName = () => {
    const { filter, contacts } = this.state;
    const normilizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normilizeFilter)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { filter } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={css.appContainer}>
          <div>
            <h1 className={css.title}>Phonebook</h1>
            <ContactForm handleBtnNameSubmit={this.handleBtnNameSubmit} />
          </div>
          <div>
            <h2 className={css.subtitle}>Contacts</h2>
            <Filter value={filter} onChange={this.handleNameChange} />
            <ContactList
              getVisibleName={this.getVisibleName}
              deleteContact={this.deleteContact}
            />
          </div>
        </div>
      </div>
    );
  }
}
