import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import '../../animate.css';

interface props {
  setName: any;
}

interface state {
  name: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonStyled = styled(Button)`
  margin-top: 1em !important;
`;

const TitleText = styled.h4`
  color: darkblue;
`;

export default class Join extends Component<props, state> {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  setUsername = () => {
    const name = this.state.name !== '' ? this.state.name : 'user' + Math.floor(Math.random() * (10000 - 1000) + 1000);
    this.props.setName(name);
  };

  handleKeyPress = e => e.key === 'Enter' && this.props.setName(this.state.name);

  render() {
    return (
      <div>
        <Container>
          <TitleText className={"animated fadeInDown"}>Welcome to Yak</TitleText>
        </Container>
        <Container>
          <span className="p-float-label">
            <InputText id="in" value={this.state.name}
              onChange={(e) => this.setState({ name: e.currentTarget.value.replace(' ', '') })} onKeyDown={this.handleKeyPress}
            />
            <label htmlFor="in">Username</label>
          </span>
        </Container>
        <Container>
          <ButtonStyled className={"animated fadeInUp"} label="Join" onClick={this.setUsername} />
        </Container>
      </div>
    );
  }
};