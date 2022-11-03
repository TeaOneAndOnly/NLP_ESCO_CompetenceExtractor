import { RequestContext } from 'next/dist/server/base-server';
import { useEffect, useState } from 'react';
import UserModel from '../express/models/User/UserModel';
import authMW from '../nextJSMW/authMW';
import store from '../zustand/store';
import Modal from './components/Modal';
import Navigation from './navigations';
import PostingList from './PostingsListComponent';
import Select, { createFilter } from 'react-select'
import { FixedSizeList as List } from "react-window";


export default function Home({ user }:
  { user: UserModel }) {

  const { avaialbleSkills } = store(({ skills }) => ({ avaialbleSkills: skills }))

  const options = avaialbleSkills.map((item) => ({ value: item._id, label: item.label }))
  const [selectedSkills, setSelectedOptions] = useState<string[]>([])

  const { relations, postings, skills, fetchResources } =
    store(({ relations, postings, skills, fetchResources }) => ({ relations, postings, skills, fetchResources }))

  const filteredPostings = postings.filter((posting) => {
    if (selectedSkills.length > 0) {
      const postingHasSkillIds = relations.filter((item) => item.fromId === posting._id && item.toType === 'skill')
        .map(({ toId }) => (toId))
      return selectedSkills.some((skill) => postingHasSkillIds.includes(skill))
    }
    return true
  })

  useEffect(() => {
    fetchResources()
  }, [])

  const selectStyles = {
    menuList: (styles: any) => {
      console.log('menuList:', styles);
      return {
        ...styles,
        // maxHeight: 136,
        // overflow: 'hidden'
      };
    }
  };

  return (
    <div className='relative'>
      <div className='p-4 flex justify-center flex-col items-center overflow-scroll h-[100vh]'>
        <Modal></Modal>
        <Navigation user={user}></Navigation>
        {
          !user.isAdmin &&
          <div
            className='w-[80%]
              flex justify-center 
              mb-2
              z-50
              
            '
          >

            <Select
              onChange={(e) => {
                const arr: string[] = []
                for (const selectedOption of e.values()) {
                  arr.push(selectedOption.value)
                }
                setSelectedOptions(arr)
              }}
              className='w-[80%]'
              options={options}
              isMulti={true}
              menuShouldBlockScroll={false}
              styles={selectStyles}
              filterOption={createFilter({ ignoreAccents: false })}
              components={{ MenuList }}

            />
          </div>

        }
        <PostingList user={user} postings={filteredPostings} skills={skills} relations={relations}></PostingList>
      </div>
    </div>
  )
}

function MenuList({ options, children, maxHeight, getValue }: any) {
  const [value] = getValue();
  const height = 35;

  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      width={''}
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }: any) => <div style={style}>{children[index]}</div>}
    </List>
  );
}


export async function getServerSideProps(context: RequestContext) {
  return authMW(context)
}