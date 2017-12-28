import React, { Component } from 'react'
import styled from 'styled-components'
import FolderIcon from '../icons/folder'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  height: 110px;
  text-align: center;
  cursor: default;
`
const Name = styled.span`
  width: 100%;
  word-wrap: break-word;
`

export default class Item extends Component {

  render() {
    const { item, ...props } = this.props
    const { shortName, path } = item
    return (
      <Wrapper title={path} {...props}>
        <FolderIcon size={48} fill='#4890ff' />
        <Name>{shortName}</Name>
      </Wrapper>
    )
  }

}
