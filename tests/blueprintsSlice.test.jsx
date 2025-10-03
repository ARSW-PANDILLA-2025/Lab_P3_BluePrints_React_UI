import { describe, it, expect } from 'vitest'
import reducer from '../src/features/blueprints/blueprintsSlice.js'

describe('blueprints slice', () => {
  it('should initialize correctly', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    expect(state.authors).toEqual([])
  })

  it('stores items by author on fetchByAuthor.fulfilled', () => {
    const prev = reducer(undefined, { type: '@@INIT' })
    const action = {
      type: 'blueprints/fetchByAuthor/fulfilled',
      payload: { author: 'john', items: [{ author: 'john', name: 'a', points: [] }] },
    }
    const next = reducer(prev, action)
    expect(next.byAuthor.john).toHaveLength(1)
  })

  it('appends created blueprint to byAuthor', () => {
    const prev = {
      authors: [],
      byAuthor: { john: [] },
      current: null,
      status: 'idle',
      error: null,
    }
    const action = {
      type: 'blueprints/createBlueprint/fulfilled',
      payload: { author: 'john', name: 'new', points: [] },
    }
    const next = reducer(prev, action)
    expect(next.byAuthor.john).toHaveLength(1)
    expect(next.byAuthor.john[0].name).toBe('new')
  })

  it('updates blueprint in list and current on updateBlueprint.fulfilled', () => {
    const prev = {
      authors: [],
      byAuthor: { john: [{ author: 'john', name: 'a', points: [{ x: 1, y: 1 }] }] },
      current: { author: 'john', name: 'a', points: [{ x: 1, y: 1 }] },
      status: 'idle',
      error: null,
    }
    const action = {
      type: 'blueprints/updateBlueprint/fulfilled',
      payload: { author: 'john', name: 'a', points: [{ x: 2, y: 2 }] },
    }
    const next = reducer(prev, action)
    expect(next.byAuthor.john[0].points[0]).toEqual({ x: 2, y: 2 })
    expect(next.current.points[0]).toEqual({ x: 2, y: 2 })
  })

  it('removes blueprint from list and clears current on deleteBlueprint.fulfilled', () => {
    const prev = {
      authors: [],
      byAuthor: { john: [{ author: 'john', name: 'a', points: [] }] },
      current: { author: 'john', name: 'a', points: [] },
      status: 'idle',
      error: null,
    }
    const action = { type: 'blueprints/deleteBlueprint/fulfilled', payload: { author: 'john', name: 'a' } }
    const next = reducer(prev, action)
    expect(next.byAuthor.john).toHaveLength(0)
    expect(next.current).toBeNull()
  })
})
