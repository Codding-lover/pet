import { useEditor } from '@craftjs/core';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { selected, actions, query } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.toolbar,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  const deleteNode = () => {
    if (selected?.id) {
      actions.delete(selected.id);
    }
  };

  return (
    <div className="space-y-4" data-testid="settings-panel">
      <h3 className="text-sm font-semibold text-gray-700">Element Settings</h3>
      
      {selected ? (
        <div className="space-y-4">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{selected.name}</div>
                <div className="text-xs text-gray-500">Selected Element</div>
              </div>
              {selected.isDeletable && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={deleteNode}
                  data-testid="button-delete-element"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>

          {selected.settings && (
            <Card className="p-4">
              {React.createElement(selected.settings)}
            </Card>
          )}
        </div>
      ) : (
        <Card className="p-4">
          <div className="text-center text-sm text-gray-500">
            Select an element to view its settings
          </div>
        </Card>
      )}
    </div>
  );
};