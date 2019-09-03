import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import '../../animate.css';

interface props {
  messages: messagesInterface[];
}

interface state {
  messages: messagesInterface[];
  hiddenMessages: number[];
}

interface messagesInterface {
  name: string;
  text?: string;
  type: string;
  url?: string;
  height?: string;
  width?: string;
}

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  height: 95vh;
  width: 85%;
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

const HideGifButton = styled(Button)`
  height: 35px;
  width: 38px;
  position: absolute;
`;

export default class Messages extends Component<props, state> {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages,
      hiddenMessages: []
    };
  }

  endOfList;

  componentDidUpdate() {
    const chatWindow = document.getElementById('chatList');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  hideGif = index => {
    const updatedHiddenMessages = this.state.hiddenMessages;
    updatedHiddenMessages.push(index);
    this.setState({ hiddenMessages: updatedHiddenMessages });
  };

  CreateMessages = (messages: messagesInterface[]) => {
    return messages.map((msg, index) => {
      if (msg.type === 'message') {
        return <ListElement key={index}><span style={{ fontWeight: "bold" }}>{msg.name}:</span> {msg.text}</ListElement>
      } else {
        const display = this.state.hiddenMessages.includes(index) ? 'none' : 'list-item';
        return <li key={index} style={{ position: 'relative', display }}>
          <img alt={'there is supposed to be a cool gif here'}
            width={msg.width} height={msg.height} src={msg.url} />
          <HideGifButton label='X' style={{ left: `${+msg.width - 38}px` }} onClick={() => this.hideGif(index)} />
        </li>
      }
    });
  };

  render() {
    return (
      <List id={"chatList"}>
        {this.CreateMessages(this.state.messages)}
      </List>
    );
  }
};