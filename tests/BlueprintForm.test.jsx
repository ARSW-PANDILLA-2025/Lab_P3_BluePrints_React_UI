import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BlueprintForm from '../src/components/BlueprintForm.jsx'

// Mock del useAuth hook
vi.mock('../src/contexts/AuthContext.jsx', () => ({
  useAuth: () => ({
    user: {
      username: 'testuser',
      email: 'test@example.com',
      name: 'Test User',
      isAdmin: false
    },
    isAuthenticated: true,
    loading: false,
    login: vi.fn(),
    logout: vi.fn()
  })
}))

describe('BlueprintForm', () => {
  it('envía el formulario con puntos parseados', () => {
    const onSubmit = vi.fn()
    render(<BlueprintForm onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'house' } })
    fireEvent.change(screen.getByLabelText(/Puntos/i), {
      target: { value: '[{"x":1,"y":2}]' },
    })
    fireEvent.submit(screen.getByText(/Guardar/i))

    expect(onSubmit).toHaveBeenCalledWith({
      author: 'testuser',
      name: 'house',
      points: [{ x: 1, y: 2 }],
    })
  })
})
