import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import FolderIcon from '../icons/folder'

const Wrapper = styled.aside`
  flex: 2;
  max-width: 150px;
  background-color: rgba(220,220,220,0.15);
  user-select: none;
  overflow-y: scroll;
`
const Section = styled.section`
  font-size: 12px;
  margin-bottom: 15px;
`
const Title = styled.span`
  font-weight: 600;
  padding: 10px 10px 3px;
  cursor: default;
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
    const { explorer } = this.props
    return (
      <Wrapper>
        <Section>
          <Title>Level up</Title>
          {explorer.levelUp && (
            <Item onClick={() => explorer.path = explorer.levelUp.path}>
              <Icon><FolderIcon size={22} fill='#4890ff' /></Icon>
              <Name>{explorer.levelUp.shortName}</Name>
            </Item>
          )}
        </Section>
        <Section>
          <Title>Local files</Title>
          <Item onClick={() => explorer.path = '~'}>
            <Icon><FolderIcon size={22} fill='#4890ff' /></Icon>
            <Name>User files</Name>
          </Item>
        </Section>
        <Section>
          <Title>Last open</Title>
          {explorer.history.map((item, key) => (
            <Item key={key} onClick={() => explorer.path = item.path}>
              <Icon><FolderIcon size={22} fill='#4890ff' /></Icon>
              <Name>{item.shortName}</Name>
            </Item>
          ))}
        </Section>
      </Wrapper>
    )
  }

}
