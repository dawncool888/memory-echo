export type NotificationType = "share_visit" | "share_comment"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  shareId?: string
  commentId?: string
  content: string
  isRead: boolean
  createdAt: Date
  share?: {
    id: string
    entry: {
      id: number
      title: string
    }
  }
  comment?: {
    id: string
    user?: {
      id: string
      name: string | null
      image: string | null
    }
  }
}

export interface NotificationSettings {
  id: string
  userId: string
  shareVisit: boolean
  shareComment: boolean
  emailNotification: boolean
  browserNotification: boolean
  createdAt: Date
  updatedAt: Date
}

export interface NotificationPreferences {
  shareVisit: boolean
  shareComment: boolean
  emailNotification: boolean
  browserNotification: boolean
} 