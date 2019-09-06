import { RichUtils } from 'draft-js'

export default () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: "pink"
      }
    },
    keyBindingFn: e => {
      if (e.metaKey && e.key === "h") {
        return "highlight";
      }
    },
    handleKeyCommand: (command, editorState, { setEditorState }) => {
      if (command === "highlight") {
        const newState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT")
        setEditorState(newState);
        return true;
      }
    }
  };
};

