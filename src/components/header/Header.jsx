import React from 'react';
import { Component } from 'react';
import { HeaderStyle } from './Header.style';
import { Form, SearchbarWrapper, Searchbar, SearchButton } from './Searchbar.style';
import { SearchOutlined } from '@ant-design/icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { filter } = this.state;
    this.props.findImages(filter);
    this.setState({ filter: '' });
    e.target.reset();
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <HeaderStyle>
        <Form onSubmit={this.handleSubmit}>
          <SearchbarWrapper>
            <Searchbar
              type="text"
              placeholder="Search images and photos"
              onInput={this.handleFilterChange}
            />
            <SearchButton type="submit">
              <SearchOutlined />
            </SearchButton>
          </SearchbarWrapper>
        </Form>
      </HeaderStyle>
    );
  }
}

export default Header;
