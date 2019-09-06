import React, { Component } from 'react';
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

const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const plugins = [
  inlineToolbarPlugin, linkPlugin
];

export default class PostEditor extends Component {
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

  render() {
    return (
      <div>
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