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
  width: 85vw;
  overflow: scroll;
`;

const ButtonStyled = styled(Button)`
  position: absolute;
  right: 0;
  width: 15vw;
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
    this.props.submitMessage(this.state.text);
    this.setState({ text: '' });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.submitMessage(this.state.text);
      this.setState({ text: '' });
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