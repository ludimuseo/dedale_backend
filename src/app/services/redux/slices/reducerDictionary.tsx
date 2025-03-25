import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import { useFetch } from '@hook'

export interface StateDictionnary {
  selectedWord: string | null
  definition: string | null
  // position: { x: number; y: number } | null
  open: boolean
  loading: boolean
  error: string | null
}

interface SetWordActionPayload {
  word: string | null
  // x: number
  // y: number
}

// Async thunk for fetching definitions from Wiki
export const fetchDefinition = createAsyncThunk(
  'dictionary/fetchDefinition',
  async (word: string) => {
    const response = await fetch(
      `https://fr.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&titles=${word}&origin=*`
    )

    const fetchData = (await response.json()) as {
      query: {
        pages: Record<
          string,
          {
            extract: string
          }
        >
      }
    }

    const page = Object.values(fetchData.query.pages)[0]
    if (page.extract) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(page.extract, 'text/html')
      const paragraphs = doc.querySelectorAll('ol li')
      const text = paragraphs[0].textContent?.trim()
      const endOfSentence = '.'
      const indexEnd = Number(text?.indexOf(endOfSentence)) + 1
      const sentence = text?.slice(0, indexEnd)

      if (sentence) {
        return sentence
      }

      // for (const p of paragraphs) {
      //   const text = p.textContent?.trim()
      //   if (text && text.length > 20) {
      //     return text
      //   }
      // }
    }
    return 'Définition introuvable.'
  }
)

const sliceDictionary = createSlice({
  name: 'dictionary',
  initialState: {
    selectedWord: null,
    definition: null,
    position: null,
    open: false,
    loading: false,
    error: null,
  } as StateDictionnary,
  reducers: {
    setWord: (state, action: { payload: SetWordActionPayload }) => {
      state.selectedWord = action.payload.word
      // state.position = { x: action.payload.x, y: action.payload.y }
      state.definition = null // Reset definition while loading
      state.error = null
    },
    clearWord: (state) => {
      state.selectedWord = null
      state.definition = null
      // state.position = null
      state.error = null
    },
    toggleSearch: (state) => {
      state.open = !state.open
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinition.pending, (state) => {
        state.loading = true
        state.definition = null
      })
      .addCase(fetchDefinition.fulfilled, (state, action) => {
        state.loading = false
        state.definition = action.payload
      })
      .addCase(fetchDefinition.rejected, (state) => {
        state.loading = false
        state.error = 'Erreur lors de la récupération.'
      })
  },
})

export const { setWord, clearWord, toggleSearch } = sliceDictionary.actions
export default sliceDictionary.reducer
