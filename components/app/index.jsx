import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../sidebar'
import Main from '../main'

const Wrapper = styled.div`
  flex: 1;
  flex-direction: row;
`

export default class App extends Component {

  render() {
    return (
      <Wrapper>
        <Sidebar />
        <Main />
      </Wrapper>
    )
  }

}
