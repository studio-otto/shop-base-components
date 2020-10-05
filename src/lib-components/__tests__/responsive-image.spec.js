import { render, cleanup } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import LazyImage from '../lazy-image.vue'

afterEach(cleanup)

test('renders', async () => {
  const { getByTestId } = render(LazyImage)

  const image = getByTestId('lazy-image')

  expect(image).toBeInTheDocument()
})

test('renders alt text', async () => {
  const { getByAltText } = render(LazyImage, {
    props: {
      altText: 'Hello Otto'
    }
  })

  const image = getByAltText('Hello Otto')

  expect(image).toBeInTheDocument()
})
