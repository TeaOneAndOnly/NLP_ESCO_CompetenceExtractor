import Link from "next/link";
import JobPostingModel from "../../express/models/Posting/JobPostingModel";
import SkillModel from "../../express/models/Skill/SkillModel";
import SkillDAO from "../../express/models/Skill/SkillDAO";
import { useEffect, useState } from "react";
import store from "../../zustand/store";
import { useRouter } from "next/router";
import UserModel from "../../express/models/User/UserModel";


export default function PostListItem({ posting, skills, user }:
    { posting: JobPostingModel, skills: SkillModel[], user: UserModel }) {

    const router = useRouter()
    const { setModalProps, deletePosting } =
        store(({ setModalProps, deletePosting }) => ({ setModalProps, deletePosting }))

    return (
        <div className="relative">
            <div className="text-white w-100 bg-[#0CA7C2] h-[250px] rounded-2xl p-5 overflow-hidden flex flex-row border-solid border border-black mb-5">
                <div className="w-[80%]">
                    <div><b>Title:</b>&nbsp;{posting.title}</div>
                    <div className=""><b>Description:</b>  <br></br>{(posting.description)}</div>
                </div>


                <div className="w-[20%] break-words p-5 border-box flex justify-center flex-col items-center">
                    <span className="underline"><b>Skills:</b></span>
                    {skills.map((skill) => <>
                        <b>{skill.label}</b>
                    </>)}
                </div>
            </div>
            {
                user.isAdmin &&

                <div className="absolute top-5 right-5">
                    <svg
                        className=" opacity-50 cursor-pointer hover:opacity-100"
                        xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30">
                        <path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            onClick={() => {
                                setModalProps({
                                    callBack: async () => { deletePosting(posting._id) },
                                    show: true,
                                    component: <></>,
                                    title: 'Delete Posting?'
                                })
                            }}
                        /></svg>
                </div>

            }
            <div className="absolute bottom-[10%] w-[100%] text-center z-10">
                <span className="bg-blue-200 rounded-[30%] p-2 border border-solid border-black">
                    <span className="cursor-pointer text-[black] text-2xl p-1 rounded-[10%] opacity-[50%] hover:opacity-[100%]"
                        onClick={() => {
                            router.push(`/postings/${posting._id}`)
                        }}
                    >
                        read more
                    </span>

                </span>
            </div>
            <div className="absolute top-[88%] bg-white rounded p-1 w-[100%] blur-md h-[12%]"></div>

        </div>

    )

}


