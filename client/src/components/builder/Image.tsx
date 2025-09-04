import { useNode, UserComponent } from '@craftjs/core';

export interface ImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  objectFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  borderRadius: number;
  marginTop: number;
  marginBottom: number;
}

export const Image: UserComponent<ImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  objectFit, 
  borderRadius, 
  marginTop, 
  marginBottom 
}) => {
  const { connectors: { connect, drag }, hasSelectedNode } = useNode((node) => ({
    hasSelectedNode: node.events.selected,
  }));

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      style={{
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        display: 'inline-block'
      }}
      className={hasSelectedNode ? 'ring-2 ring-blue-500' : ''}
      data-testid="builder-image"
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width,
            height,
            objectFit,
            borderRadius: `${borderRadius}px`,
            display: 'block'
          }}
        />
      ) : (
        <div
          style={{
            width: width === 'auto' ? '200px' : width,
            height: height === 'auto' ? '150px' : height,
            backgroundColor: '#f0f0f0',
            borderRadius: `${borderRadius}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ccc'
          }}
        >
          <span style={{ color: '#666' }}>Select Image</span>
        </div>
      )}
    </div>
  );
};

Image.craft = {
  displayName: 'Image',
  props: {
    src: '',
    alt: 'Image',
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: 0,
    marginTop: 0,
    marginBottom: 0
  },
  related: {
    toolbar: () => import('./ImageSettings').then(comp => comp.ImageSettings),
  },
};