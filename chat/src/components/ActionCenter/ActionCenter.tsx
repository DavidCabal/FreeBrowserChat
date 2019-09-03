import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import '../../animate.css';

interface props {
  loadRandomGif: any;
}

interface state {

}

const GifButton = styled(Button)`
  width: 90%;
  height: 6vh;
  margin: 5%  0 0 5% !important;
`;

const Parent = styled.div`
  position: absolute;
  top: 50vh;
  right: 0;
  border-bottom: 1px solid grey;
  padding: 5px;
  height: 50vh;
  width: 15%;
  @media (max-width: 720px) {
    display:none;
  }
`;

export default class ActionCenter extends Component<props, state> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Parent>
        <GifButton label="Fail GIF" onClick={this.props.loadRandomGif} />
      </Parent>
    );
  }
};