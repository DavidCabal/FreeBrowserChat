import React from 'react';
import io from 'socket.io-client';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from 'styled-components';
import Join from './components/Join/Join';
import Messages from './components/Messages/Messages';
import Users from './components/Users/Users';
import ChatInput from './components/ChatInput/ChatInput';
import './animate.css';

interface props { }

interface User {
  id: string;
  name: string;
}

interface Message {
  name: string;
  text: string;
}

interface state {
  connected: boolean;
  name: string;
  users: User[];
  id: string;
  messages: Message[];
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

const socket = io('http://localhost:4000');

export default class App extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      name: '',
      users: [],
      id: '',
      messages: []
    };

    this.listenForEvents();
  }

  listenForEvents = () => {
    socket.on('userConnected', user => {
      const users = this.state.users;
      users.push(user);
      this.setState({ users });
    });
    socket.on('userDisconnected', id => {
      const currentUsers = this.state.users;
      const remainingUsers = currentUsers.filter(user => user.id !== id);
      this.setState({ users: remainingUsers });
    });
    socket.on('currentUsers', users => this.setState({ users }));
    socket.on('message', msg => {
      const currentMessages = this.state.messages;
      currentMessages.push({ name: msg.name, text: msg.text });
      this.setState({ messages: currentMessages });
    });
  };

  setName = (name: string) => {
    this.setState({ connected: true, name });
    socket.emit('initialConnection', '');
    socket.emit('userConnected', { id: socket.id, name });
  };

  submitMessage = msg => {
    socket.emit('message', { name: this.state.name, text: msg });
  };

  render() {
    return (
      <Parent>
        {!this.state.connected &&
          <CenteredContainer className={"animated fadeIn"}>
            <Join setName={this.setName} />
          </CenteredContainer>
        }
        {this.state.connected &&
          <div className={"animated fadeIn"}>
            <Messages messages={this.state.messages} />
            <Users users={this.state.users} getUsers={this.state.users} />
            <ChatInput submitMessage={this.submitMessage} />
          </div>
        }
      </Parent>
    );
  }
}