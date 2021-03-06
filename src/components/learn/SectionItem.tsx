import React, { useState } from 'react'
import { Skeleton, Timeline, Typography } from 'antd'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

import { Section } from '../../graphql/types'
import SectionItems from './SectionItems'
import { useSections } from '../../lib/hooks/useSections'

export default function SectionItem({
  sectionId,
  sectionsMap,
  username,
}: {
  sectionId: string
  sectionsMap: Map<string, Section>
  username: string
}) {
  const router = useRouter()
  const resourceSlug = router.query.resource as string
  const currentSection = sectionsMap.get(sectionId)!
  const [isOpen, setOpen] = useState(false)
  const { getSlugsPathFromSectionId } = useSections({ resourceSlug, username })
  if (!currentSection) {
    return <Skeleton active={true} />
  }
  const { slugs, slugsPath } = getSlugsPathFromSectionId({ sectionId })

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  if (!slugsPath) {
    return <Skeleton active={true} />
  }

  const goToResource = async () => {
    if (router.pathname === '/learn/[resource]') {
      await router.push(
        `/learn/[resource]/[...slugs]?resource=${resourceSlug}&slugs=${slugs}`,
        `/learn/${resourceSlug}${slugsPath}`
      )
      return
    }
    await router.push(
      `/[username]/learn/[resource]/[...slugs]?username=${username}&resource=${resourceSlug}&slugs=${slugs}`,
      `/${username}/learn/${resourceSlug}${slugsPath}`
    )
  }

  return (
    <Timeline.Item
      className={'font-large'}
      dot={
        currentSection.hasSubSections && (
          <span className={'cursor-pointer'} onClick={() => toggleOpen()}>
            {isOpen ? <DownOutlined /> : <RightOutlined />}
          </span>
        )
      }
    >
      <div onClick={() => toggleOpen()} className={'cursor-pointer'}>
        <Typography>
          <Typography.Title level={4}>
            {!currentSection.hasSubSections ? (
              <span
                className={'cursor-pointer text-primary'}
                onClick={() => goToResource()}
              >
                {currentSection.title}
              </span>
            ) : (
              currentSection.title
            )}
          </Typography.Title>
        </Typography>
      </div>
      {isOpen && currentSection.hasSubSections && (
        <SectionItems
          sections={currentSection.sections}
          sectionsMap={sectionsMap}
          username={username}
        />
      )}
    </Timeline.Item>
  )
}
