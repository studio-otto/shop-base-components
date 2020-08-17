import { render, cleanup, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import CollectionProductCard from '../collection-product-card.vue'

afterEach(cleanup)

test('renders', async () => {
  const { getByTestId } = render(CollectionProductCard)

  const card = getByTestId('cpc')

  expect(card).toBeInTheDocument()
})

test('renders product title', async () => {
  const { getByText } = render(CollectionProductCard, {
    props: {
      title: 'Hello Otto'
    }
  })

  const title = getByText('Hello Otto')

  expect(title).toBeInTheDocument()
})

test('renders price', async () => {
  const { getByText } = render(CollectionProductCard, {
    props: {
      price: 49.99
    }
  })

  const price = getByText('$49.99')

  expect(price).toBeInTheDocument()
})

test('renders sale price', async () => {
  const { getByText } = render(CollectionProductCard, {
    props: {
      price: 49.99,
      compareAtPrice: 39.99
    }
  })

  const compareAtPrice = getByText('$39.99')

  expect(compareAtPrice).toBeInTheDocument()
})
