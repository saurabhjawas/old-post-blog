import React, { Component } from 'react';
import { convertToRaw } from 'draft-js'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';


import { 
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeBlockButton,HeadlineTwoButton,HeadlineThreeButton
 } from 'draft-js-buttons';

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

// import actions
import { saveDraft } from '../actions/post'
// redux
import { connect } from 'react-redux'

const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const plugins = [
  inlineToolbarPlugin, linkPlugin
];

class PostEditor extends Component {
  state = {
    postTitle: '',
    editorState: createEditorStateWithText(''),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };
  
  handlePostTitleChange = (e) => { 
    const postTitle = e.target.value
    this.setState({postTitle}) 
  }

  handleSaveDraft = (e) => {
    const contentState = this.state.editorState.getCurrentContent()
    const draftContent = convertToRaw(contentState)
    const draft = {
      title: this.state.postTitle,
      body: draftContent
    }
    this.props.saveDraft(draft)
  }

  render() {
    return (
      <div>
        <div className="postButtonWrapper">
          <button className="postButton"
            onClick={this.handleSaveDraft}
          >
            Save draft
          </button>

          <button className="postButton">
            Publish
          </button>
        </div>
        <input className="postTitleInput" 
          type="text"
          value={this.state.postTitle}
          onChange={this.handlePostTitleChange}
          placeholder="post title here.."
        />
        <div className="postEditor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element }}
            placeholder="Please enter content of post. You can use inline toobar (it appears when you highlight text).."
          />
          <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveDraft: (draft) => {
    dispatch(saveDraft(draft))
  }
})

export default connect(undefined, mapDispatchToProps)(PostEditor)