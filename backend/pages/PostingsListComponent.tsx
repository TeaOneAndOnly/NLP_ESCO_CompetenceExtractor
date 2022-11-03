import { RequestContext } from "next/dist/server/base-server";
import { client } from "../api/apiClient";
import JobPostingModel from "../express/models/Posting/JobPostingModel";
import RelationModel from "../express/models/Relation/RelationModel";
import SkillModel from "../express/models/Skill/SkillModel";
import UserModel from "../express/models/User/UserModel";
import PostListItem from "./postings/PostListItem";
import { useRouter } from "next/router"


export default function PostingList({ user, postings, skills, relations }:
    { user: UserModel, postings: JobPostingModel[], skills: SkillModel[], relations: RelationModel[] }) {
    const router = useRouter()
    return (
        <>

            <div className="w-[80%] bg-white p-2 overflow-scroll relative min-h-[556px]">
                {user.isAdmin && <div className="mb-2 flex justify-end sticky top-0 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 24 24" width="60"
                        className="cursor-pointer"
                        onClick={() =>
                            router.push('/postings/create')
                        }
                    >
                        <path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                    </svg>
                </div>}

               

                {postings.map((posting) => {
                    return <PostListItem posting={posting} skills={
                        skills.filter((skill) => relations.find((relation) =>
                            relation.fromId === posting._id &&
                            relation.toId === skill._id
                        ))
                    }
                        user={user}
                    ></PostListItem>
                })}
            </div>

        </>
    )
}





