import create, { StateCreator } from 'zustand'
import RelationModel from '../express/models/Relation/RelationModel'
import SkillModel from '../express/models/Skill/SkillModel'
import { WholeStore } from './store'

export interface RelationSlice {
    relations: RelationModel[]
}

export const createRelationSlice: StateCreator<
    WholeStore,
    [],
    [],
    RelationSlice
> = (set, get) => ({
    relations: []
})