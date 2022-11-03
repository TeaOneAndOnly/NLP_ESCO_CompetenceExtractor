import { useRouter } from "next/router";
import store from "../../zustand/store";

export default function PostListItem() {
    const router = useRouter()
    const { id } = router.query

    let { posting, relations, skills } = store((state) => ({
        posting: state.postings.find((posting) => posting._id === id),
        relations: state.relations,
        skills: state.skills
    }))
    console.log({ posting, relations, skills })

    skills = skills.filter((skill) =>
        relations.find((relation) =>
            relation.fromId === posting?._id &&
            relation.toId === skill._id
        )
    )

    return (
        <div className="relative flex justify-center  items-center h-[100vh]">
            <div className="w-[80%] text-white w-[80%] bg-[#0CA7C2]  rounded-2xl p-5 overflow-hidden flex flex-row border-solid border border-black mb-5 
                    max-h-[720px] overflow-scroll">
                <div className="w-[80%]">
                    <div><b>Title:</b>&nbsp;{posting?.title}</div>
                    <div className=""><b>Description:</b>  <br></br>{(posting?.description)}</div>
                </div>


                <div className="w-[20%] break-words p-5 border-box flex justify-center flex-col items-center">
                    <span className="underline"><b>Skills:</b></span>
                    {skills.map((skill) => <>
                        <b>{skill.label}</b>
                    </>)}
                </div>
            </div>



        </div>


    )

}


