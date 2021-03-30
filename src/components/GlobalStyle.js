import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
    --color-orange: rgb(255, 170, 84);
    --gradient-orange: linear-gradient(to right, #f83600 0%, #f9d423 100%);
    --color-lightorange: #fff2e4;
    --color-lightgrey:#D5D5D5;
  }
  * {
    box-sizing: border-box
  }
  body {
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: 112.5%;
    line-height: 1.5;
    align-items: center;
  }

 input,
    button {
  font-size: 1.2em;
  font-weight:500;
  padding: 5px;
  outline:none;
  border-radius:5px;
}

input {
  width:100%;
}
  `
