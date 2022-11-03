import create, { StateCreator } from 'zustand'
import SkillModel from '../express/models/Skill/SkillModel'
import { WholeStore } from './store'

export interface SkillSlice {
    skills: SkillModel[]
    fetchSkills: () => Promise<any>
}

export const createSkillSlice: StateCreator<
    WholeStore,
    [],
    [],
    SkillSlice
> = (set,get) => ({
    skills: [],
    fetchSkills: async() => { set(state => ({skills: []})) }
})