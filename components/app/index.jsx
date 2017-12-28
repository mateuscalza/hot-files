import React, { Component } from 'react'
import styled from 'styled-components'
import Sidebar from '../sidebar'
import Preview from '../preview'
import Contents from '../contents'

const Wrapper = styled.div`
  flex: 1;
  flex-direction: row;
`

export default class App extends Component {

  render() {
    return (
      <Wrapper>
        <Sidebar />
        <Contents />
        <Preview />
      </Wrapper>
    )
  }

}
