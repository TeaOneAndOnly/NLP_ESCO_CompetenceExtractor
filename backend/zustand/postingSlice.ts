import create, { StateCreator } from 'zustand'
import { client } from '../api/apiClient'
import JobPostingModel from '../express/models/Posting/JobPostingModel'
import SkillModel from '../express/models/Skill/SkillModel'
import { WholeStore } from './store'

export interface PostingSlice {
    postings: JobPostingModel[],
    deletePosting: (id: string) => Promise<any>
}

export const createPostingSlice: StateCreator<
    WholeStore,
    [],
    [],
    PostingSlice
> = (set, get) => ({
    postings: [],
    deletePosting: async (id: string) => {
        await client({ path: `/postings/${id}`, method: 'DELETE' })
        await get().fetchResources()
    }
})