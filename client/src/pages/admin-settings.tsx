import { useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Save, Settings, Palette, Search } from "lucide-react";

interface Setting {
  id: number;
  key: string;
  value: string;
  type: string;
  group: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState<Record<string, any>>({});

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/admin/settings"],
  });

  const updateSetting = useMutation({
    mutationFn: async ({ key, value, type, group }: { key: string; value: string; type: string; group: string }) => {
      return apiRequest("POST", "/api/admin/settings", { key, value, type, group });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({ title: "Success", description: "Settings updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update settings",
        variant: "destructive"
      });
    },
  });

  const getSettingValue = (key: string, defaultValue: string = "") => {
    if (formData[key] !== undefined) return formData[key];
    const setting = settings?.find((s: Setting) => s.key === key);
    return setting?.value || defaultValue;
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async (group: string) => {
    const settingsToUpdate = Object.entries(formData).filter(([key]) => {
      const setting = settingsData[group]?.find((s: any) => s.key === key);
      return setting !== undefined;
    });

    for (const [key, value] of settingsToUpdate) {
      const setting = settingsData[group]?.find((s: any) => s.key === key);
      if (setting) {
        await updateSetting.mutateAsync({
          key,
          value: String(value),
          type: setting.type,
          group: setting.group,
        });
      }
    }
  };

  const settingsData = {
    general: [
      { key: "site_title", label: "Site Title", type: "text", group: "general", placeholder: "Dog Years Calculator" },
      { key: "site_description", label: "Site Description", type: "textarea", group: "general", placeholder: "A scientifically accurate dog age calculator" },
      { key: "contact_email", label: "Contact Email", type: "email", group: "general", placeholder: "contact@dogyears.com" },
      { key: "footer_text", label: "Footer Text", type: "text", group: "general", placeholder: "© 2024 Dog Years Calculator" },
      { key: "enable_testimonials", label: "Enable Testimonials", type: "boolean", group: "general" },
      { key: "enable_blog", label: "Enable Blog", type: "boolean", group: "general" },
    ],
    appearance: [
      { key: "theme_color", label: "Primary Color", type: "color", group: "appearance", placeholder: "#f97316" },
      { key: "logo_url", label: "Logo URL", type: "text", group: "appearance", placeholder: "/logo.png" },
      { key: "favicon_url", label: "Favicon URL", type: "text", group: "appearance", placeholder: "/favicon.ico" },
      { key: "hero_title", label: "Hero Title", type: "text", group: "appearance", placeholder: "Dog Years Calculator" },
      { key: "hero_subtitle", label: "Hero Subtitle", type: "text", group: "appearance", placeholder: "Discover your dog's age in human years" },
      { key: "hero_background", label: "Hero Background Image", type: "text", group: "appearance", placeholder: "/hero-bg.jpg" },
    ],
    seo: [
      { key: "meta_title", label: "Default Meta Title", type: "text", group: "seo", placeholder: "Dog Years Calculator - Convert Dog Age to Human Years" },
      { key: "meta_description", label: "Default Meta Description", type: "textarea", group: "seo", placeholder: "Calculate your dog's age in human years with our scientifically accurate calculator." },
      { key: "meta_keywords", label: "Meta Keywords", type: "text", group: "seo", placeholder: "dog age, calculator, pet, human years" },
      { key: "google_analytics", label: "Google Analytics ID", type: "text", group: "seo", placeholder: "GA-XXXXXXXXX" },
      { key: "google_search_console", label: "Google Search Console Code", type: "textarea", group: "seo", placeholder: "Enter verification code" },
      { key: "robots_txt", label: "Robots.txt Content", type: "textarea", group: "seo", placeholder: "User-agent: *\nDisallow:" },
    ],
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const renderSettingInput = (setting: any) => {
    const value = getSettingValue(setting.key, "");

    switch (setting.type) {
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => updateFormData(setting.key, e.target.value)}
            placeholder={setting.placeholder}
            rows={3}
            data-testid={`input-${setting.key}`}
          />
        );
      case "boolean":
        return (
          <Switch
            checked={value === "true" || value === true}
            onCheckedChange={(checked) => updateFormData(setting.key, checked)}
            data-testid={`switch-${setting.key}`}
          />
        );
      case "color":
        return (
          <div className="flex space-x-2">
            <Input
              type="color"
              value={value || "#f97316"}
              onChange={(e) => updateFormData(setting.key, e.target.value)}
              className="w-16 h-10"
              data-testid={`color-${setting.key}`}
            />
            <Input
              type="text"
              value={value}
              onChange={(e) => updateFormData(setting.key, e.target.value)}
              placeholder={setting.placeholder}
              className="flex-1"
              data-testid={`input-${setting.key}`}
            />
          </div>
        );
      default:
        return (
          <Input
            type={setting.type === "email" ? "email" : "text"}
            value={value}
            onChange={(e) => updateFormData(setting.key, e.target.value)}
            placeholder={setting.placeholder}
            data-testid={`input-${setting.key}`}
          />
        );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="text-settings-title">Settings</h1>
            <p className="text-gray-600">Configure your site settings and preferences</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general" className="flex items-center space-x-2" data-testid="tab-general">
              <Settings className="w-4 h-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2" data-testid="tab-appearance">
              <Palette className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center space-x-2" data-testid="tab-seo">
              <Search className="w-4 h-4" />
              <span>SEO</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(settingsData).map(([group, groupSettings]) => (
            <TabsContent key={group} value={group}>
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold capitalize">{group} Settings</h2>
                    <Button
                      onClick={() => saveSettings(group)}
                      disabled={updateSetting.isPending}
                      className="flex items-center space-x-2"
                      data-testid={`button-save-${group}`}
                    >
                      <Save className="w-4 h-4" />
                      <span>{updateSetting.isPending ? "Saving..." : "Save Changes"}</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {groupSettings.map((setting) => (
                      <div key={setting.key} className="space-y-2">
                        <Label htmlFor={setting.key} className="text-sm font-medium">
                          {setting.label}
                        </Label>
                        {renderSettingInput(setting)}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
}