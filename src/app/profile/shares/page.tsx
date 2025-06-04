import { api } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function MySharesPage() {
  const { data: shares, isLoading, refetch } = api.share.getMyShares.useQuery()
  const deleteShare = api.share.deleteShare.useMutation({
    onSuccess: () => {
      refetch()
    },
  })
  const { toast } = useToast()
  const [copyingId, setCopyingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleCopy = async (id: string) => {
    setCopyingId(id)
    const url = `${window.location.origin}/share/${id}`
    await navigator.clipboard.writeText(url)
    toast({ title: "已复制分享链接", description: url })
    setCopyingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定要删除该分享链接？")) return
    setDeletingId(id)
    try {
      await deleteShare.mutateAsync({ id })
      toast({ title: "已删除分享链接" })
    } catch {
      toast({ title: "删除失败", variant: "destructive" })
    }
    setDeletingId(null)
  }

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">我的分享</h1>
      {isLoading ? (
        <div>加载中...</div>
      ) : !shares || shares.length === 0 ? (
        <div className="text-gray-500">暂无分享记录</div>
      ) : (
        <div className="space-y-4">
          {shares.map((share) => (
            <div key={share.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-medium">{share.entry.title}</div>
                <div className="text-sm text-gray-500">
                  创建于 {new Date(share.createdAt).toLocaleDateString()}
                  {share.expiresAt && (
                    <span>，有效期至 {new Date(share.expiresAt).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 break-all mt-1">
                  {`${window.location.origin}/share/${share.id}`}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  访问次数：{share.views ?? 0}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button size="sm" variant="outline" onClick={() => handleCopy(share.id)} disabled={copyingId === share.id}>
                  {copyingId === share.id ? "复制中..." : "复制链接"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(share.id)} disabled={deletingId === share.id}>
                  {deletingId === share.id ? "删除中..." : "删除"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
} 