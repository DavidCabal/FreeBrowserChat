import React, { Component } from 'react';
import styled from 'styled-components';
import '../../animate.css';

interface props {
  users: User[],
  getUsers: any
}

interface state {
  users: User[]
}

interface User {
  id: string;
  name: string;
}

const Parent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid grey;
  padding: 5px;
  height: 50vh;
  width: 15vw;
  @media (max-width: 720px) {
    display:none;
  }
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

const ListElement = styled.li`
  padding: 5px 10px 5px 10px;
  overflow-wrap: break-word;
`;

const CreateUsers = (users: User[]) => {
  return users.map((user, index) => {
    return <ListElement className={"animated fadeIn"} key={index}>{user.name}</ListElement>
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
          {CreateUsers(this.props.getUsers)}
        </List>
      </Parent>
    );
  }
};