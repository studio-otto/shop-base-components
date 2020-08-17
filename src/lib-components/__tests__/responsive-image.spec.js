import { render, cleanup } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import ResponsiveImage from '../responsive-image.vue'

afterEach(cleanup)

test('renders', async () => {
  const { getByTestId } = render(ResponsiveImage)

  const image = getByTestId('responsive-image')

  expect(image).toBeInTheDocument()
})

test('renders alt text', async () => {
  const { getByAltText } = render(ResponsiveImage, {
    props: {
      altText: 'Hello Otto'
    }
  })

  const image = getByAltText('Hello Otto')

  expect(image).toBeInTheDocument()
})
