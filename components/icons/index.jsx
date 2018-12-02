import React from 'react'
import styled from 'styled-components'

const Element = styled.i`
  display: flex;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;

  &::before {
    flex: 1;
  }
`

const icons = {
  arrowLeft: 'hf-ic_keyboard_arrow_left_48px',
  arrowRight: 'hf-ic_keyboard_arrow_right_48px',
  up: 'hf-ic_arrow_upward_48px'
}

export default ({ name }) => <Element className={`hf-icon ${icons[name]}`} />
