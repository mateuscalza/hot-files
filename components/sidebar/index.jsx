import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import FolderIcon from '../icons/folder'

const Wrapper = styled.aside`
  flex: 2;
  max-width: 150px;
  background-color: rgba(220,220,220,0.15);
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

@inject('explorer')
@observer
export default class Sidebar extends Component {

  render() {
    return (
      <Wrapper>
        <Section>
          <Title>Level up</Title>
        </Section>
        <Section>
          <Title>Last open</Title>
        </Section>
        <Section>
          <Title>Local files</Title>
          <Item onClick={() => this.props.explorer.path = '~'}>
            <Icon><FolderIcon size={22} fill='#4890ff' /></Icon>
            <Name>User files</Name>
          </Item>
        </Section>
      </Wrapper>
    )
  }

}
