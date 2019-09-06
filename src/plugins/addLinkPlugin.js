import React from 'react'
import { RichUtils, KeyBindingUtil, EditorState } from 'draft-js'


const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    }, callback
  )
}

const EmbeddedLink = (props) => {
  const { contentState, entityKey } = props
  const { url } = contentState.getEntity(entityKey).getData()
  
  return (
    <a className="link" href={url}>{props.children}</a>
  )
}

addLinkPlugin = () => {
  
}