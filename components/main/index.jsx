import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.main`
  flex: 3;
  border-left: 1px solid rgba(0,0,0,0.15);
  background-color: #fff;
`

export default class Main extends Component {

  render() {
    return (
      <Wrapper>
        Olá!
      </Wrapper>
    )
  }

}
