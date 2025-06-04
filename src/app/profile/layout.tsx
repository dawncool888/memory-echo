import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, User, Share2 } from "lucide-react"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <nav className="space-y-2">
            <Link href="/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                个人资料
              </Button>
            </Link>
            <Link href="/profile/shares">
              <Button variant="ghost" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                我的分享
              </Button>
            </Link>
            <Link href="/profile/notifications">
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                通知设置
              </Button>
            </Link>
          </nav>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  )
} 