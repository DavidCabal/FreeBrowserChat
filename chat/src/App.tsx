import React from 'react';
import io from 'socket.io-client';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from 'styled-components';
import Join from './components/Join/Join';
import Messages from './components/Messages/Messages';
import Users from './components/Users/Users';
import './animate.css';

interface props { }

interface state {
  name: string;
  users: string[];
}

const Parent = styled.div`
  background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  height: 100vh;
`;

const CenteredContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const testMessages = [
  { user: 'abc', message: 'hi' },
  { user: 'def', message: 'yo' },
  { user: 'ghi', message: 'sup' }
];

const socket = io('http://localhost:4000');

export default class App extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      users: []
    };

    this.listenForEvents();
  }

  listenForEvents = () => {
    socket.on('userConnected', user => {
      const users = this.state.users;
      users.push(user);
      this.setState({ users });
    });
  };

  setName = (name: string) => {
    this.setState({ name });
    socket.emit('userConnected', name);
  };

  render() {
    return (
      <Parent>
        {this.state.name === '' &&
          <CenteredContainer className={"animated fadeIn"}>
            <Join setName={this.setName} />
          </CenteredContainer>
        }
        {this.state.name !== '' &&
          <div className={"animated fadeIn"}>
            <Messages messages={testMessages} />
            <Users users={this.state.users} />
          </div>
        }
      </Parent>
    );
  }
}