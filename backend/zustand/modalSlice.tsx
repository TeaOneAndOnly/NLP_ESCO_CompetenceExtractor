import create, { StateCreator } from 'zustand'
import SkillModel from '../express/models/Skill/SkillModel'
import { WholeStore } from './store'

type ModalProps = {

    show: boolean,
    component: JSX.Element,
    title: string,
    disableFooter?: boolean
    callBack: () => Promise<any>

}
export interface ModalSlice {
    modalProps: ModalProps
    setModalProps: (modalProps: ModalProps) => Promise<any>
}

export const createModalSlice: StateCreator<
    WholeStore,
    [],
    [],
    ModalSlice
> = (set, get) => ({
    modalProps: {
        show: false,
        component: <></>,
        title: '',
        disableFooter: false,
        callBack: async () => { return Promise.resolve(true) }
    },
    setModalProps: async (modalProps: ModalProps) => {
        set(() => ({ modalProps }))
        return true
    }
})