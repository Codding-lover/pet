import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ButtonProps } from './Button';

export const ButtonSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as ButtonProps,
  }));

  return (
    <div className="space-y-4" data-testid="button-settings">
      <div>
        <Label htmlFor="button-text">Button Text</Label>
        <Input
          id="button-text"
          value={props.text}
          onChange={(e) => setProp((props: ButtonProps) => props.text = e.target.value)}
          data-testid="input-button-text"
        />
      </div>

      <div>
        <Label htmlFor="link">Link URL</Label>
        <Input
          id="link"
          value={props.link}
          onChange={(e) => setProp((props: ButtonProps) => props.link = e.target.value)}
          placeholder="https://example.com"
          data-testid="input-link"
        />
      </div>

      <div>
        <Label htmlFor="target">Link Target</Label>
        <Select 
          value={props.target} 
          onValueChange={(value) => setProp((props: ButtonProps) => props.target = value as any)}
        >
          <SelectTrigger data-testid="select-target">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_self">Same Window</SelectItem>
            <SelectItem value="_blank">New Window</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="background-color">Background</Label>
          <Input
            id="background-color"
            type="color"
            value={props.backgroundColor}
            onChange={(e) => setProp((props: ButtonProps) => props.backgroundColor = e.target.value)}
            data-testid="input-background-color"
          />
        </div>
        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <Input
            id="text-color"
            type="color"
            value={props.color}
            onChange={(e) => setProp((props: ButtonProps) => props.color = e.target.value)}
            data-testid="input-text-color"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="hover-bg">Hover Background</Label>
          <Input
            id="hover-bg"
            type="color"
            value={props.hoverBackgroundColor}
            onChange={(e) => setProp((props: ButtonProps) => props.hoverBackgroundColor = e.target.value)}
            data-testid="input-hover-background"
          />
        </div>
        <div>
          <Label htmlFor="hover-text">Hover Text Color</Label>
          <Input
            id="hover-text"
            type="color"
            value={props.hoverColor}
            onChange={(e) => setProp((props: ButtonProps) => props.hoverColor = e.target.value)}
            data-testid="input-hover-text"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="font-size">Font Size</Label>
          <Input
            id="font-size"
            type="number"
            value={props.fontSize}
            onChange={(e) => setProp((props: ButtonProps) => props.fontSize = parseInt(e.target.value))}
            data-testid="input-font-size"
          />
        </div>
        <div>
          <Label htmlFor="border-radius">Border Radius</Label>
          <Input
            id="border-radius"
            type="number"
            value={props.borderRadius}
            onChange={(e) => setProp((props: ButtonProps) => props.borderRadius = parseInt(e.target.value))}
            data-testid="input-border-radius"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="padding-x">Padding X</Label>
          <Input
            id="padding-x"
            type="number"
            value={props.paddingX}
            onChange={(e) => setProp((props: ButtonProps) => props.paddingX = parseInt(e.target.value))}
            data-testid="input-padding-x"
          />
        </div>
        <div>
          <Label htmlFor="padding-y">Padding Y</Label>
          <Input
            id="padding-y"
            type="number"
            value={props.paddingY}
            onChange={(e) => setProp((props: ButtonProps) => props.paddingY = parseInt(e.target.value))}
            data-testid="input-padding-y"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="font-weight">Font Weight</Label>
        <Select 
          value={props.fontWeight} 
          onValueChange={(value) => setProp((props: ButtonProps) => props.fontWeight = value as any)}
        >
          <SelectTrigger data-testid="select-font-weight">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="300">Light</SelectItem>
            <SelectItem value="500">Medium</SelectItem>
            <SelectItem value="600">Semi Bold</SelectItem>
            <SelectItem value="700">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Border</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="border-width">Width</Label>
            <Input
              id="border-width"
              type="number"
              value={props.borderWidth}
              onChange={(e) => setProp((props: ButtonProps) => props.borderWidth = parseInt(e.target.value))}
              data-testid="input-border-width"
            />
          </div>
          <div>
            <Label htmlFor="border-color">Color</Label>
            <Input
              id="border-color"
              type="color"
              value={props.borderColor}
              onChange={(e) => setProp((props: ButtonProps) => props.borderColor = e.target.value)}
              data-testid="input-border-color"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="border-style">Style</Label>
          <Select 
            value={props.borderStyle} 
            onValueChange={(value) => setProp((props: ButtonProps) => props.borderStyle = value as any)}
          >
            <SelectTrigger data-testid="select-border-style">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="margin-top">Margin Top</Label>
          <Input
            id="margin-top"
            type="number"
            value={props.marginTop}
            onChange={(e) => setProp((props: ButtonProps) => props.marginTop = parseInt(e.target.value))}
            data-testid="input-margin-top"
          />
        </div>
        <div>
          <Label htmlFor="margin-bottom">Margin Bottom</Label>
          <Input
            id="margin-bottom"
            type="number"
            value={props.marginBottom}
            onChange={(e) => setProp((props: ButtonProps) => props.marginBottom = parseInt(e.target.value))}
            data-testid="input-margin-bottom"
          />
        </div>
      </div>
    </div>
  );
};