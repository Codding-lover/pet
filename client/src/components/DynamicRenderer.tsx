import { useQuery } from '@tanstack/react-query';
import { Editor, Frame } from '@craftjs/core';

// Import builder components
import { Text, Container, Image, Button as BuilderButton, Navigation } from './builder';

interface DynamicRendererProps {
  type?: 'element' | 'page';
  elementType?: 'header' | 'footer' | 'section';
  slug?: string;
  pageSlug?: string;
  isHomePage?: boolean;
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  type = 'element',
  elementType,
  slug,
  pageSlug,
  isHomePage = false
}) => {
  // Fetch elements if rendering element type
  const { data: elements } = useQuery<any[]>({
    queryKey: ['/api/elements', { type: elementType }],
    enabled: type === 'element' && !!elementType,
  });

  // Fetch specific page if rendering page type
  const { data: page } = useQuery<any>({
    queryKey: isHomePage ? ['/api/pages/home'] : ['/api/pages', pageSlug],
    enabled: type === 'page' && (isHomePage || !!pageSlug),
  });

  // Render elements (headers, footers, sections)
  if (type === 'element' && elements) {
    return (
      <div data-testid={`dynamic-${elementType}`}>
        {elements
          .filter(element => element.isActive)
          .sort((a, b) => a.order - b.order)
          .map((element) => (
            <div key={element.id} data-element-id={element.id}>
              {element.content && (
                <Editor
                  resolver={{
                    Text,
                    Container,
                    Image,
                    Button: BuilderButton,
                    Navigation
                  }}
                  enabled={false}
                >
                  <Frame data={JSON.stringify(element.content)} />
                </Editor>
              )}
            </div>
          ))}
      </div>
    );
  }

  // Render page content
  if (type === 'page' && page) {
    return (
      <div data-testid="dynamic-page" data-page-id={page.id}>
        {page.layout && (
          <Editor
            resolver={{
              Text,
              Container,
              Image,
              Button: BuilderButton,
              Navigation
            }}
            enabled={false}
          >
            <Frame data={JSON.stringify(page.layout)} />
          </Editor>
        )}
        {page.content && (
          <div 
            dangerouslySetInnerHTML={{ __html: page.content }}
            className="prose max-w-none"
          />
        )}
      </div>
    );
  }

  return null;
};