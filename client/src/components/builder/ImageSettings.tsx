import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ImageProps } from './Image';

export const ImageSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props as ImageProps,
  }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProp((props: ImageProps) => props.src = result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4" data-testid="image-settings">
      <div>
        <Label htmlFor="image-src">Image URL</Label>
        <Input
          id="image-src"
          value={props.src}
          onChange={(e) => setProp((props: ImageProps) => props.src = e.target.value)}
          placeholder="https://example.com/image.jpg"
          data-testid="input-image-src"
        />
      </div>

      <div>
        <Label htmlFor="image-upload">Or Upload Image</Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          data-testid="input-image-upload"
        />
      </div>

      <div>
        <Label htmlFor="alt-text">Alt Text</Label>
        <Input
          id="alt-text"
          value={props.alt}
          onChange={(e) => setProp((props: ImageProps) => props.alt = e.target.value)}
          data-testid="input-alt-text"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            value={props.width}
            onChange={(e) => setProp((props: ImageProps) => props.width = e.target.value)}
            placeholder="auto, 300px, 100%"
            data-testid="input-width"
          />
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={props.height}
            onChange={(e) => setProp((props: ImageProps) => props.height = e.target.value)}
            placeholder="auto, 200px"
            data-testid="input-height"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="object-fit">Object Fit</Label>
        <Select 
          value={props.objectFit} 
          onValueChange={(value) => setProp((props: ImageProps) => props.objectFit = value as any)}
        >
          <SelectTrigger data-testid="select-object-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cover">Cover</SelectItem>
            <SelectItem value="contain">Contain</SelectItem>
            <SelectItem value="fill">Fill</SelectItem>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="scale-down">Scale Down</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="border-radius">Border Radius</Label>
        <Input
          id="border-radius"
          type="number"
          value={props.borderRadius}
          onChange={(e) => setProp((props: ImageProps) => props.borderRadius = parseInt(e.target.value))}
          data-testid="input-border-radius"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="margin-top">Margin Top</Label>
          <Input
            id="margin-top"
            type="number"
            value={props.marginTop}
            onChange={(e) => setProp((props: ImageProps) => props.marginTop = parseInt(e.target.value))}
            data-testid="input-margin-top"
          />
        </div>
        <div>
          <Label htmlFor="margin-bottom">Margin Bottom</Label>
          <Input
            id="margin-bottom"
            type="number"
            value={props.marginBottom}
            onChange={(e) => setProp((props: ImageProps) => props.marginBottom = parseInt(e.target.value))}
            data-testid="input-margin-bottom"
          />
        </div>
      </div>
    </div>
  );
};