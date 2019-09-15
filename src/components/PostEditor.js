import React, { Component } from 'react';

import Editor from 'draft-js-plugins-editor';

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

class PostEditor extends Component {

  focus = () => {
    this.editor.focus();
  };
  
  handleEditorChange = (editorState) => {
    this.props.setPostEditorState(editorState)
  }

  render() {
    return (

      <div 
      className={this.props.readOnly ? "postEditor viewPostEditor" : "postEditor"} onClick={this.focus}
      >
        <Editor readOnly={this.props.readOnly}
          editorState={this.props.postEditorState}
          onChange={this.handleEditorChange}
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
    )
  }
}

PostEditor.defaultProps = {
  readOnly: true
}

export default PostEditor