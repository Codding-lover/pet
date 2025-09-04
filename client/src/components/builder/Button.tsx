import { useNode, UserComponent } from '@craftjs/core';

export interface ButtonProps {
  text: string;
  backgroundColor: string;
  color: string;
  borderRadius: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  hoverBackgroundColor: string;
  hoverColor: string;
  link: string;
  target: '_self' | '_blank';
  marginTop: number;
  marginBottom: number;
}

export const Button: UserComponent<ButtonProps> = ({ 
  text,
  backgroundColor,
  color,
  borderRadius,
  paddingX,
  paddingY,
  fontSize,
  fontWeight,
  borderWidth,
  borderColor,
  borderStyle,
  hoverBackgroundColor,
  hoverColor,
  link,
  target,
  marginTop,
  marginBottom
}) => {
  const { connectors: { connect, drag }, hasSelectedNode } = useNode((node) => ({
    hasSelectedNode: node.events.selected,
  }));

  const handleClick = (e: React.MouseEvent) => {
    if (hasSelectedNode) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (link && link.trim() !== '') {
      if (target === '_blank') {
        window.open(link, '_blank');
      } else {
        window.location.href = link;
      }
    }
  };

  return (
    <button
      ref={(ref: HTMLButtonElement) => connect(drag(ref))}
      onClick={handleClick}
      style={{
        backgroundColor,
        color,
        borderRadius: `${borderRadius}px`,
        padding: `${paddingY}px ${paddingX}px`,
        fontSize: `${fontSize}px`,
        fontWeight,
        border: borderStyle !== 'none' ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
        cursor: hasSelectedNode ? 'move' : 'pointer',
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        transition: 'all 0.2s ease',
        outline: 'none'
      }}
      onMouseEnter={(e) => {
        if (!hasSelectedNode) {
          e.currentTarget.style.backgroundColor = hoverBackgroundColor;
          e.currentTarget.style.color = hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!hasSelectedNode) {
          e.currentTarget.style.backgroundColor = backgroundColor;
          e.currentTarget.style.color = color;
        }
      }}
      className={hasSelectedNode ? 'ring-2 ring-blue-500' : ''}
      data-testid="builder-button"
    >
      {text}
    </button>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    text: 'Click me',
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: 4,
    paddingX: 16,
    paddingY: 8,
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 0,
    borderColor: '#007bff',
    borderStyle: 'none',
    hoverBackgroundColor: '#0056b3',
    hoverColor: '#ffffff',
    link: '',
    target: '_self',
    marginTop: 0,
    marginBottom: 0
  },
  related: {
    toolbar: () => import('./ButtonSettings').then(comp => comp.ButtonSettings),
  },
};