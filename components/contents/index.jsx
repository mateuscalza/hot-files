import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Item from './item'

const Wrapper = styled.main`
  position: relative;

  flex: 3;
  border-left: 1px solid rgba(0,0,0,0.15);
  background-color: #fff;
  padding: 10px;
  user-select: none;
  overflow-y: scroll;

  display: grid;
  grid-auto-flow: row;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  grid-template-rows: repeat(auto-fill,minmax(100px,1fr));
  grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
`

@inject('explorer')
@observer
export default class Contents extends Component {
  constructor(props) {
    super(props)
    this.path = props.explorer.path
  }

  componentWillUpdate(nextProps, nextState) {
    const { explorer } = nextProps
    if (explorer.path !== this.path) {
      this.path = explorer.path
      this.handlePathChange()
    }
  }

  handlePathChange() {
    if (this.wrapperElement) {
      this.wrapperElement.scrollTop = 0
    }
  }

  render() {
    const { explorer } = this.props
    return (
      <Wrapper innerRef={wrapperElement => this.wrapperElement = wrapperElement}>
        {explorer.content && explorer.content.map(
          item => (
            <Item
              key={item.path}
              item={item}
              onClick={() => this.setState({ ok: true })}
              onDoubleClick={() => explorer.fromItem(item)}
            />
          )
        )}
      </Wrapper>
    )
  }
}
