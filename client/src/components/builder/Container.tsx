import { useNode, UserComponent } from '@craftjs/core';

export interface ContainerProps {
  background: string;
  padding: number;
  margin: number;
  width: string;
  height: string;
  flexDirection: 'row' | 'column';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
}

export const Container: UserComponent<ContainerProps> = ({ 
  background, 
  padding, 
  margin, 
  width, 
  height, 
  flexDirection, 
  justifyContent, 
  alignItems, 
  gap,
  borderRadius,
  borderWidth,
  borderColor,
  borderStyle,
  children 
}) => {
  const { connectors: { connect, drag }, hasSelectedNode } = useNode((node) => ({
    hasSelectedNode: node.events.selected,
  }));

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      style={{
        background,
        padding: `${padding}px`,
        margin: `${margin}px`,
        width,
        height,
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        gap: `${gap}px`,
        borderRadius: `${borderRadius}px`,
        border: borderStyle !== 'none' ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
        minHeight: '50px',
        position: 'relative'
      }}
      className={hasSelectedNode ? 'ring-2 ring-blue-500' : ''}
      data-testid="builder-container"
    >
      {children}
    </div>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    background: 'transparent',
    padding: 20,
    margin: 0,
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#000000',
    borderStyle: 'none'
  },
  related: {
    toolbar: () => import('./ContainerSettings').then(comp => comp.ContainerSettings),
  },
};