import create from "zustand";
import { createSkillSlice, SkillSlice } from "./skillSlice";
import { client } from "../api/apiClient";
import SkillModel from "../express/models/Skill/SkillModel";
import RelationModel from "../express/models/Relation/RelationModel";
import JobPostingModel from "../express/models/Posting/JobPostingModel";
import { createRelationSlice, RelationSlice } from "./relationsSlice";
import { createPostingSlice, PostingSlice } from "./postingSlice";
import { createModalSlice, ModalSlice } from "./modalSlice";
import { persist } from 'zustand/middleware'
export type WholeStore =
    SkillSlice &
    {
        fetchResources: () => Promise<any>
        logout: () => Promise<any>
    } &
    RelationSlice &
    PostingSlice &
    ModalSlice



export default create<WholeStore>()(persist((set, get, api,) => ({
    ...createSkillSlice(set, get, api, []),
    ...createRelationSlice(set, get, api, []),
    ...createPostingSlice(set, get, api, []),
    ...createModalSlice(set, get, api, []),
    fetchResources: async () => {
        const { skills, relations, postings } = await client({
            path: `/postings`,
            headers: {
                'Content-Type': 'application/json',
            },
        }) as { skills: SkillModel[]; relations: RelationModel[]; postings: JobPostingModel[]; };

        set(() => ({ skills, relations, postings }))
    },
    logout: async () => {
        await client({
            path: '/signOut',
            method: 'POST'
        })
    }

})))

