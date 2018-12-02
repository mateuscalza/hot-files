import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import FolderIcon from '../icons/folder'
import Icon from '../icons'
import { TopPanel, Button } from '../controls'
import { primaryColor } from '../../design/constants'

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
const IconWrapper = styled.span`padding: 0 5px;`
const Name = styled.span``

@inject('explorer')
@observer
export default class Sidebar extends Component {

  render() {
    const { explorer } = this.props
    return (
      <Wrapper>
        <TopPanel>
          <Button
            disabled={!explorer.backCandidate}
            title={explorer.backCandidate ? explorer.backCandidate.path : null}
            onClick={() => explorer.goBack()}
            style={{ borderRadius: '5px 0 0 5px' }}
          >
            <Icon name='arrowLeft' />
          </Button>
          <Button
            disabled={!explorer.forwardCandidate}
            title={explorer.forwardCandidate ? explorer.forwardCandidate.path : null}
            onClick={() => explorer.goForward()}
            style={{ marginLeft: -1, borderRadius: '0 5px 5px 0' }}
          >
            <Icon name='arrowRight' />
          </Button>
          <Button
            disabled={!explorer.levelUp}
            title={explorer.levelUp ? explorer.levelUp.path : null}
            onClick={() => explorer.path = explorer.levelUp.path}
            style={{ marginLeft: 5 }}
          >
            <Icon name='up' />
          </Button>
        </TopPanel>

        <Section>
          <Title>Local files</Title>
          <Item onClick={() => explorer.path = '~'}>
            <IconWrapper><FolderIcon size={22} fill={primaryColor} /></IconWrapper>
            <Name>User files</Name>
          </Item>
        </Section>
      </Wrapper>
    )
  }

}
