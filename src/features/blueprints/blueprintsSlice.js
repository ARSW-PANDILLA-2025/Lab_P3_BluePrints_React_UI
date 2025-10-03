import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchAuthors = createAsyncThunk('blueprints/fetchAuthors', async () => {
  const svc = (await import('../../services/blueprintsService.js')).default
  const all = await svc.getAll()
  // Espera array de {author, name, points}
  const authors = [...new Set(all.map((bp) => bp.author))]
  return authors
})

export const fetchByAuthor = createAsyncThunk('blueprints/fetchByAuthor', async (author) => {
  const svc = (await import('../../services/blueprintsService.js')).default
  const data = await svc.getByAuthor(author)
  return { author, items: data }
})

export const fetchBlueprint = createAsyncThunk(
  'blueprints/fetchBlueprint',
  async ({ author, name }) => {
    const svc = (await import('../../services/blueprintsService.js')).default
    const data = await svc.getByAuthorAndName(author, name)
    return data
  },
)

export const createBlueprint = createAsyncThunk('blueprints/createBlueprint', async (payload) => {
  const svc = (await import('../../services/blueprintsService.js')).default
  const data = await svc.create(payload)
  return data
})

export const updateBlueprint = createAsyncThunk(
  'blueprints/updateBlueprint',
  async ({ author, name, changes }) => {
    const svc = (await import('../../services/blueprintsService.js')).default
    const data = await svc.update(author, name, changes)
    return data
  },
)

export const deleteBlueprint = createAsyncThunk(
  'blueprints/deleteBlueprint',
  async ({ author, name }) => {
    const svc = (await import('../../services/blueprintsService.js')).default
    await svc.remove(author, name)
    return { author, name }
  },
)

const slice = createSlice({
  name: 'blueprints',
  initialState: {
    authors: [],
    byAuthor: {},
    current: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (s) => {
        s.status = 'loading'
      })
      .addCase(fetchAuthors.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.authors = a.payload
      })
      .addCase(fetchAuthors.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.error.message
      })
      .addCase(fetchByAuthor.fulfilled, (s, a) => {
        s.byAuthor[a.payload.author] = a.payload.items
      })
      .addCase(fetchBlueprint.fulfilled, (s, a) => {
        s.current = a.payload
      })
      .addCase(createBlueprint.fulfilled, (s, a) => {
        const bp = a.payload
        if (s.byAuthor[bp.author]) s.byAuthor[bp.author].push(bp)
      })
      .addCase(updateBlueprint.fulfilled, (s, a) => {
        const bp = a.payload
        const list = s.byAuthor[bp.author]
        if (list) {
          const idx = list.findIndex((x) => x.name === bp.name)
          if (idx !== -1) list[idx] = bp
        }
        if (s.current && s.current.author === bp.author && s.current.name === bp.name) {
          s.current = bp
        }
      })
      .addCase(deleteBlueprint.fulfilled, (s, a) => {
        const { author, name } = a.payload
        const list = s.byAuthor[author]
        if (list) s.byAuthor[author] = list.filter((x) => x.name !== name)
        if (s.current && s.current.author === author && s.current.name === name) {
          s.current = null
        }
      })
  },
})

export default slice.reducer
