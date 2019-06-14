import React, { Component } from 'react';
import { Consumer } from '../../Context';
import TextInputGroup from '../layouts/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
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
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is Required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is Required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is Required' } });
      return;
    }

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params; 

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    //clear fields
    this.setState({
      name: '',
      email: '',
      phone: '',
      error: {}
    });
    //re direct to contats after adding
    this.props.history.push('/');
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className='card-header'> Edit Contact </div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    value={name}
                    placeholder='Enter Full Name'
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Enter email'
                    name='email'
                    type='email'
                    value={email}
                    placeholder='Enter email'
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Enter phone'
                    name='phone'
                    value={phone}
                    placeholder='Enter Full phone'
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type='submit'
                    value='Update Contact'
                    className='btn btn-block btn-dark'
                  />
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
