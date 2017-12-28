import React, { Component } from 'react'
import styled from 'styled-components'
import FolderIcon from '../icons/folder'

const Wrapper = styled.aside`
  flex: 1;
  max-width: 150px;
  background-color: rgba(220,220,220,0.1);
`
const Section = styled.section`
  font-size: 12px;
  margin-bottom: 20px;
`
const Title = styled.span`
  font-weight: 600;
  padding: 10px 10px 3px;
`
const Item = styled.a.attrs({ href: '#' })`
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 3px 10px;

  &:hover {
    background-color: rgba(210,210,210,0.25);
  }
`
const Icon = styled.span`padding: 0 5px;`
const Name = styled.span``

export default class Sidebar extends Component {

  render() {
    return (
      <Wrapper>
        <Section>
          <Title>Local files</Title>
          <Item>
            <Icon><FolderIcon size={22} fill='#4890ff' /></Icon>
            <Name>User files</Name>
          </Item>
        </Section>
      </Wrapper>
    )
  }

}
