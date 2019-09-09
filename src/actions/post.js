import * as actionTypes from './actionTypes'

export const saveDraft = (draft) => ({
  type: actionTypes.SAVE_DRAFT,
  draft
})
