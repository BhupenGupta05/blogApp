import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // for additional matchers
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component', () => {

  test('renders title and author, but not URL or likes by default', () => {

    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 10,
      user: { username: 'testuser' },
    }

    // Render the Blog component with the mock data
    const component = render(<Blog blog={blog} />)

    // Check if the title and author are rendered
    expect(component.container).toHaveTextContent('Test Blog Test Author')

    // Check that URL and likes are not rendered by default
    expect(component.container).not.toHaveTextContent('http://testurl.com')
    expect(component.container).not.toHaveTextContent('10')
  })
})
