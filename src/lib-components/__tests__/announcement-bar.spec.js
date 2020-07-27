import { render } from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import AnnouncementBar from '../announcement-bar.vue'

test('renders', async () => {
  const { getByTestId } = render(AnnouncementBar, {
    props: {
      enabled: true,
      slides: [{ url: 'https://testing.com', text: 'Hello World' }]
    }
  })

  const bar = getByTestId('announcement-bar')

  expect(bar).toBeInTheDocument()
})

test('renders given text', async () => {
  const { getByText } = render(AnnouncementBar, {
    props: {
      enabled: true,
      slides: [{ url: 'https://testing.com', text: 'Hello World' }]
    }
  })

  const bar = getByText('Hello World')

  expect(bar).toBeInTheDocument()
})

test('renders given background color', async () => {
  const { getByText } = render(AnnouncementBar, {
    props: {
      enabled: true,
      backgroundColor: `#2d942a`,
      slides: [{ url: 'https://testing.com', text: 'Hello World' }]
    }
  })

  const bar = getByText('Hello World')

  expect(bar).toBeInTheDocument()
})
