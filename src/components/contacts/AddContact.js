import React, { Component } from 'react';
import { Consumer } from '../../Context';
import TextInputGroup from '../layouts/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

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
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className='card-header'> Add Contact </div>
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
                    value='Add Contact'
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

export default AddContact;
