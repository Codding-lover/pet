import { useNode, UserComponent } from '@craftjs/core';

export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  target: '_self' | '_blank';
}

export interface NavigationProps {
  items: NavigationItem[];
  backgroundColor: string;
  linkColor: string;
  hoverColor: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  padding: number;
  gap: number;
  alignment: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
  direction: 'horizontal' | 'vertical';
  borderRadius: number;
}

export const Navigation: UserComponent<NavigationProps> = ({ 
  items,
  backgroundColor,
  linkColor,
  hoverColor,
  fontSize,
  fontWeight,
  padding,
  gap,
  alignment,
  direction,
  borderRadius
}) => {
  const { connectors: { connect, drag }, hasSelectedNode } = useNode((node) => ({
    hasSelectedNode: node.events.selected,
  }));

  const handleLinkClick = (e: React.MouseEvent, url: string, target: string) => {
    if (hasSelectedNode) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (url && url.trim() !== '') {
      if (target === '_blank') {
        window.open(url, '_blank');
      } else {
        window.location.href = url;
      }
    }
  };

  const justifyContentMap = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end',
    'space-between': 'space-between',
    'space-around': 'space-around'
  };

  return (
    <nav
      ref={(ref: HTMLElement) => connect(drag(ref))}
      style={{
        backgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        justifyContent: justifyContentMap[alignment],
        alignItems: direction === 'horizontal' ? 'center' : 'flex-start',
        gap: `${gap}px`,
        minHeight: '40px'
      }}
      className={hasSelectedNode ? 'ring-2 ring-blue-500' : ''}
      data-testid="builder-navigation"
    >
      {items.length === 0 ? (
        <span style={{ color: '#666', fontSize: '14px' }}>Add navigation items</span>
      ) : (
        items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.target}
            onClick={(e) => handleLinkClick(e, item.url, item.target)}
            style={{
              color: linkColor,
              fontSize: `${fontSize}px`,
              fontWeight,
              textDecoration: 'none',
              cursor: hasSelectedNode ? 'default' : 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!hasSelectedNode) {
                e.currentTarget.style.color = hoverColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!hasSelectedNode) {
                e.currentTarget.style.color = linkColor;
              }
            }}
            data-testid={`nav-link-${item.id}`}
          >
            {item.title}
          </a>
        ))
      )}
    </nav>
  );
};

Navigation.craft = {
  displayName: 'Navigation',
  props: {
    items: [
      { id: '1', title: 'Home', url: '/', target: '_self' },
      { id: '2', title: 'About', url: '/about', target: '_self' },
      { id: '3', title: 'Contact', url: '/contact', target: '_self' }
    ],
    backgroundColor: 'transparent',
    linkColor: '#333333',
    hoverColor: '#007bff',
    fontSize: 16,
    fontWeight: 'normal',
    padding: 10,
    gap: 20,
    alignment: 'left',
    direction: 'horizontal',
    borderRadius: 0
  },
  related: {
    toolbar: () => import('./NavigationSettings').then(comp => comp.NavigationSettings),
  },
};