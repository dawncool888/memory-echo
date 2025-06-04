import { api } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { NotificationPreferences } from "@/types/notification"

export default function NotificationSettingsPage() {
  const { toast } = useToast()
  const { data: settings, isLoading } = api.notification.getSettings.useQuery()
  const updateSettings = api.notification.updateSettings.useMutation({
    onSuccess: () => {
      toast({
        title: "设置已更新",
        description: "您的通知设置已成功保存",
      })
    },
  })

  if (isLoading) {
    return <div>加载中...</div>
  }

  const handleSettingChange = (key: keyof NotificationPreferences, value: boolean) => {
    updateSettings.mutate({ [key]: value })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">通知设置</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>分享通知</CardTitle>
            <CardDescription>管理您的分享相关通知设置</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="share-visit">访问通知</Label>
              <Switch
                id="share-visit"
                checked={settings?.shareVisit}
                onCheckedChange={(checked) =>
                  handleSettingChange("shareVisit", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="share-comment">评论通知</Label>
              <Switch
                id="share-comment"
                checked={settings?.shareComment}
                onCheckedChange={(checked) =>
                  handleSettingChange("shareComment", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>通知方式</CardTitle>
            <CardDescription>选择您希望接收通知的方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notification">邮件通知</Label>
              <Switch
                id="email-notification"
                checked={settings?.emailNotification}
                onCheckedChange={(checked) =>
                  handleSettingChange("emailNotification", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notification">浏览器通知</Label>
              <Switch
                id="browser-notification"
                checked={settings?.browserNotification}
                onCheckedChange={(checked) =>
                  handleSettingChange("browserNotification", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 