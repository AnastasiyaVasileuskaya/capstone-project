import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
    --color-orange: rgb(255, 170, 84);
    --color-lightorange: #fff2e4;
    --color-lightgrey:#D5D5D5;
    --color-beige:rgb(255, 247, 237);
    --color-warmorange:#ffe5c3;
    --color-grey:#bbbbbb;
    --gradient-orange: linear-gradient(to right, #f83600 0%, #f9d423 100%);
    --gradient-beige:linear-gradient(
    176deg,
    rgba(255, 247, 237, 1) 1%,
    rgba(255, 255, 255, 1) 77%,
    rgba(255, 255, 255, 1) 98%
  );
    --box-shadow-small:2px 4px 6px 1px rgba(0, 0, 0, 0.24);
    --box-shadow-middle:7px 6px 28px 1px rgba(0, 0, 0, 0.24);
    --box-shadow-active:3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }

  * {
    box-sizing: border-box
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 112.5%;
    line-height: 1.5;
    background:#FFD8AD;
  }

 input,
    button, textarea {
  font-size: 1.2em;
  font-weight:500;
  padding: 5px;
  outline:none;
  border-radius:5px;
  width:100%;
}
  `
