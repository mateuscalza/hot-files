import styled from 'styled-components'
import { primaryColor } from '../../design/constants'

export const TopPanel = styled.div`
  padding: 10px;
  flex-direction: row;
`
export const Button = styled.button`
  flex: 1;
  padding: 3px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  background-color: #fff;
  color: inherit;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 18px;

  &:active {
    background-color: ${primaryColor};
    color: #fff;
  }
`
