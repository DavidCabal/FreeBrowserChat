import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styled from 'styled-components';

interface props {
  submitMessage: any;
}

interface state {
  text: string;
}

const Container = styled.div`
  display: flex;
  justify-content: left;
`;

const MessageInput = styled(InputText)`
  position: absolute;
  height: 5vh;
  width: 85%;
  overflow: scroll;
`;

const ButtonStyled = styled(Button)`
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 15%;
  height: 5vh;
  @media (max-width: 720px) {
    width: 20vw;
  }
`;

export default class Join extends Component<props, state> {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  sendMessage = () => {
    if (this.state.text.length > 0) {
      this.props.submitMessage({ text: this.state.text });
      this.setState({ text: '' });
    }
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {
    return (
      <div>
        <Container>
          <MessageInput id="in" value={this.state.text} placeholder={"enter message"} autoComplete={"off"}
            onChange={(e) => this.setState({ text: e.currentTarget.value })} onKeyDown={this.handleKeyPress}
          />
        </Container>
        <Container>
          <ButtonStyled label="Submit" onClick={this.sendMessage} />
        </Container>
      </div>
    );
  }
};