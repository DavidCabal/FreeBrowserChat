import React, { Component } from 'react';
import styled from 'styled-components';
import '../../animate.css';

interface props {
  users: string[]
}

interface state {
  users: string[]
}

const Parent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid grey;
  padding: 5px;
  height: 50vh;
  width: 15vw;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

const CreateUsers = (users: string[]) => {
  return users.map((user, index) => {
    return <li className={"animated fadeIn"} key={index}>{user}</li>
  });
};

export default class Users extends Component<props, state> {
  constructor(props) {
    super(props);

    this.state = {
      users: this.props.users
    };
  }

  render() {
    return (
      <Parent>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ textDecoration: "underline" }}>Current Users</h4>
        </div>
        <List>
          {CreateUsers(this.state.users)}
        </List>
      </Parent>
    );
  }
};