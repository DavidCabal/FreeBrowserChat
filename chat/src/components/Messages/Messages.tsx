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
  name: string;
  text: string;
}

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  height: 95vh;
  width: 85vw;
  border: 1px solid grey;
  overflow: auto;
  padding: 5px 15px 5px 5px;
  @media (max-width: 720px) {
    width: 100vw;
  }
`;

const ListElement = styled.li`
  padding-top: 5px;
`;

const CreateMessages = (messages: messagesInterface[]) => {
  return messages.map((msg, index) => {
    return <ListElement key={index}><span style={{ fontWeight: "bold" }}>{msg.name}:</span> {msg.text}</ListElement>
  });
};

export default class Messages extends Component<props, state> {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages
    };
  }

  endOfList;

  componentDidUpdate() {
    const chatWindow = document.getElementById('chatList');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  render() {
    return (
      <List id={"chatList"}>
        {CreateMessages(this.state.messages)}
      </List>
    );
  }
};