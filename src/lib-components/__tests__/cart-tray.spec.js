import { render, cleanup, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import CartTray from '../cart-tray.vue'

afterEach(cleanup)

// <cart-tray :open="cartOpen" side="left" @onClose="toggleCart" />

test('renders', async () => {
  const { getByTestId } = render(CartTray)

  const tray = getByTestId('cart-tray')

  expect(tray).toBeInTheDocument()
})
