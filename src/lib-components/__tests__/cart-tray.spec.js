import { render, cleanup } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import CartTray from '../cart-tray.vue'

afterEach(cleanup)

// <cart-tray :open="cartOpen" side="left" @onClose="toggleCart" />

test('renders', async () => {
  const { getByTestId } = render(CartTray)

  const tray = getByTestId('cart-tray')

  expect(tray).toBeInTheDocument()
})

test('renders empty message on empty cart', async () => {
  const { getByText } = render(CartTray)

  const message = getByText('Your cart is empty.')

  expect(message).toBeInTheDocument()
})
