import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { types } from '../../modules/explorer'
import FolderIcon from '../icons/folder'
import FileIcon from '../icons/file'

const Wrapper = styled.div.attrs({ className: 'item' })`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  text-align: center;
  cursor: default;
  border-radius: 5px;
  ${({ selected }) => selected ? css`
    background-color: rgba(0,0,0,0.1);
  ` : null}
`
const Name = styled.span`
  width: 100%;
  word-wrap: break-word;
`
const Layer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`
const FolderRegion = styled.div`
  position: relative;
  width: 41px;
  height: 35px;
`
const RightTags = styled.div`
  position: absolute;
  top: 7px;
  right: -15px;
  width: 30px;
  height: 28px;
  align-items: center;
  justify-content: center;
`
const LeftTags = RightTags.extend`
  right: initial;
  left: -15px;
`
const Tag = styled.span`
  display: flex;
  font-size: 9px;
  font-weight: bolder;
  padding: 1px 4px;
  border-radius: 5px;
  color: #fff;
  background-color: #7f8c8d;
  margin: 1px 0;
`

export default class Item extends Component {

  render() {
    const { item, ...props } = this.props
    const { shortName, path, type, selected, versionable = false, p2p = false, web = false } = item

    const smallTags = []
    if (versionable) {
      smallTags[smallTags.length] = 'GIT'
    }
    if (p2p) {
      smallTags[smallTags.length] = 'P2P'
    }
    if (web) {
      smallTags[smallTags.length] = 'WEB'
    }

    return (
      <Wrapper selected={selected} title={path} {...props}>
        {type === types.DIRECTORY
          ? <FolderIcon size={48} fill='#4890ff' />
          : <FileIcon size={48} fill='#4890ff' />
        }
        <Name>{shortName}</Name>
        {!!smallTags.length && (
          <Layer>
            <FolderRegion>
              <LeftTags>
                {smallTags[2] && <Tag>{smallTags[2]}</Tag>}
              </LeftTags>
              <RightTags>
                {smallTags[0] && <Tag>{smallTags[0]}</Tag>}
                {smallTags[1] && <Tag>{smallTags[1]}</Tag>}
              </RightTags>
            </FolderRegion>
          </Layer>
        )}
      </Wrapper>
    )
  }

}
