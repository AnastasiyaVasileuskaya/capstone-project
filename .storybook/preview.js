import GlobalStyle from '../src/components/GlobalStyle'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
  layout: 'fullscreen',
}

export const decorators =[
  Story => (
    <>
    <MemoryRouter initialEntries={['/']}>
      <GlobalStyle />
      <Story />
      </MemoryRouter> 
    </>
  ),

]