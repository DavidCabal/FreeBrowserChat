import React, { Component } from 'react';
import styled from 'styled-components';
import '../../animate.css';

interface props {
  messages: messagesInterface[]
}

interface state {
  messages: messagesInterface[]
}

interface messagesInterface {
  user: string;
  message: string;
}

const CreateMessages = (messages: messagesInterface[]) => {
  return messages.map((msg, index) => {
    return <li key={index}><span style={{ fontWeight: "bold" }}>{msg.user}:</span> {msg.message}</li>
  });
};

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 95vh;
  width: 85vw;
  border: 1px solid grey;
  overflow: auto;
  padding: 5px;
`;

export default class Messages extends Component<props, state> {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages
    };
  }

  render() {
    return (
      <List>
        {CreateMessages(this.state.messages)}
      </List>
    );
  }
};