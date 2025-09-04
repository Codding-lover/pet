import { useNode, UserComponent } from '@craftjs/core';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';

export interface TextProps {
  text: string;
  fontSize: number;
  color: string;
  fontWeight: 'normal' | 'bold' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  marginTop: number;
  marginBottom: number;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const Text: UserComponent<TextProps> = ({ 
  text, 
  fontSize, 
  color, 
  fontWeight, 
  textAlign, 
  marginTop, 
  marginBottom,
  tag 
}) => {
  const { connectors: { connect, drag }, hasSelectedNode, actions: { setProp } } = useNode((node) => ({
    hasSelectedNode: node.events.selected,
  }));
  const [editable, setEditable] = useState(false);

  const handleTextChange = (e: any) => {
    setProp((props: TextProps) => {
      props.text = e.target.value;
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSelectedNode) return;
    e.preventDefault();
    e.stopPropagation();
    setEditable(true);
  };

  const handleBlur = () => {
    setEditable(false);
  };

  const Component = tag;

  return (
    <Component
      ref={(ref: HTMLElement) => connect(drag(ref))}
      style={{
        fontSize: `${fontSize}px`,
        color,
        fontWeight,
        textAlign,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        cursor: hasSelectedNode ? 'text' : 'pointer',
        minHeight: '20px',
        display: 'block'
      }}
      onClick={handleClick}
      data-testid="builder-text"
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={handleTextChange}
        onBlur={handleBlur}
        style={{ outline: 'none', minHeight: '20px' }}
      />
    </Component>
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Click to edit text',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
    tag: 'p'
  },
  related: {
    toolbar: () => import('./TextSettings').then(comp => comp.TextSettings),
  },
};