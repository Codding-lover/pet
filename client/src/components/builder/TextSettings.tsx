import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TextProps } from './Text';

export const TextSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as TextProps,
  }));

  return (
    <div className="space-y-4" data-testid="text-settings">
      <div>
        <Label htmlFor="text-content">Text Content</Label>
        <Input
          id="text-content"
          value={props.text}
          onChange={(e) => setProp((props: TextProps) => props.text = e.target.value)}
          data-testid="input-text-content"
        />
      </div>
      
      <div>
        <Label htmlFor="font-size">Font Size</Label>
        <Input
          id="font-size"
          type="number"
          value={props.fontSize}
          onChange={(e) => setProp((props: TextProps) => props.fontSize = parseInt(e.target.value))}
          data-testid="input-font-size"
        />
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="color"
          value={props.color}
          onChange={(e) => setProp((props: TextProps) => props.color = e.target.value)}
          data-testid="input-color"
        />
      </div>

      <div>
        <Label htmlFor="font-weight">Font Weight</Label>
        <Select 
          value={props.fontWeight} 
          onValueChange={(value) => setProp((props: TextProps) => props.fontWeight = value as any)}
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
            <SelectItem value="800">Extra Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="text-align">Text Align</Label>
        <Select 
          value={props.textAlign} 
          onValueChange={(value) => setProp((props: TextProps) => props.textAlign = value as any)}
        >
          <SelectTrigger data-testid="select-text-align">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tag">HTML Tag</Label>
        <Select 
          value={props.tag} 
          onValueChange={(value) => setProp((props: TextProps) => props.tag = value as any)}
        >
          <SelectTrigger data-testid="select-tag">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h1">H1 - Large Heading</SelectItem>
            <SelectItem value="h2">H2 - Heading</SelectItem>
            <SelectItem value="h3">H3 - Sub Heading</SelectItem>
            <SelectItem value="h4">H4 - Small Heading</SelectItem>
            <SelectItem value="h5">H5 - Tiny Heading</SelectItem>
            <SelectItem value="h6">H6 - Smallest Heading</SelectItem>
            <SelectItem value="p">Paragraph</SelectItem>
            <SelectItem value="span">Span</SelectItem>
            <SelectItem value="div">Div</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="margin-top">Margin Top</Label>
          <Input
            id="margin-top"
            type="number"
            value={props.marginTop}
            onChange={(e) => setProp((props: TextProps) => props.marginTop = parseInt(e.target.value))}
            data-testid="input-margin-top"
          />
        </div>
        <div>
          <Label htmlFor="margin-bottom">Margin Bottom</Label>
          <Input
            id="margin-bottom"
            type="number"
            value={props.marginBottom}
            onChange={(e) => setProp((props: TextProps) => props.marginBottom = parseInt(e.target.value))}
            data-testid="input-margin-bottom"
          />
        </div>
      </div>
    </div>
  );
};