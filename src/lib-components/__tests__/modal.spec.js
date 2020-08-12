import { render, cleanup, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import Modal from '../modal.vue'

afterEach(cleanup)

test('renders', async () => {
  const { getByTestId } = render(Modal)

  const tray = getByTestId('modal')

  expect(tray).toBeInTheDocument()
})

test('renders given title', async () => {
  const { getByText } = render(Modal, {
    props: {
      title: `Hello World`
    }
  })

  const title = getByText('Hello World')

  expect(title).toBeInTheDocument()
})
