import React, { Component } from 'react'
import styled from 'styled-components'
import FolderIcon from '../icons/folder'

const Wrapper = styled.aside`
  flex: 1;
  max-width: 200px;
`
const Section = styled.section`
  font-size: 12px;
  margin-bottom: 20px;
`
const Title = styled.span`
  font-weight: 600;
  padding: 10px 10px 0;
`
const Item = styled.a.attrs({ href: '#' })`
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 0 10px;
`
const Icon = styled.span`padding: 5px;`
const Name = styled.span``

export default class Sidebar extends Component {

  render() {
    return (
      <Wrapper>
        <Section>
          <Title>Local files</Title>
          <Item>
            <Icon><FolderIcon size={22} fill='#95a5a6' /></Icon>
            <Name>User files</Name>
          </Item>
        </Section>
      </Wrapper>
    )
  }

}
