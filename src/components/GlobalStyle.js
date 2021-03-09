import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
    --color-orange: rgb(255, 170, 84);
    --gradient-orange: linear-gradient(
    0deg,
    rgba(255, 170, 84, 1) 40%,
    rgba(254, 212, 171, 0.9925187032418953) 75%
  );
    --color-lightorange: #f2e8dd;
  }
  * {
    box-sizing: border-box
  }
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 112.5%;
    line-height: 1.5;
    align-items: center;
  }

  input,
    button {
  font-size: inherit;
  padding: 5px;
}
  `
