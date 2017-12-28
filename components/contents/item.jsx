import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { types } from '../../modules/explorer'
import FolderIcon from '../icons/folder'
import FileIcon from '../icons/file'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  text-align: center;
  cursor: default;
  ${({ selected }) => selected ? css`
    background-color: rgba(0,0,0,0.15);
  ` : null}
`
const Name = styled.span`
  width: 100%;
  word-wrap: break-word;
`

export default class Item extends Component {

  render() {
    const { item, ...props } = this.props
    const { shortName, path, type, selected } = item
    return (
      <Wrapper selected={selected} title={path} {...props}>
        {type === types.DIRECTORY
          ? <FolderIcon size={48} fill='#4890ff' />
          : <FileIcon size={48} fill='#4890ff' />
        }
        <Name>{shortName}</Name>
      </Wrapper>
    )
  }

}
