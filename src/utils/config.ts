export interface QuestTask {
  id: string
  task_type: 'vocabulary' | 'reading' | 'practice' | string
  title: string
  duration_minutes: number
  is_completed?: boolean
}

export const PWA_LOGIN_URL: string =
  (import.meta.env?.VITE_PWA_APP_URL as string | undefined) || 'https://english-learning-e6a.pages.dev/login'
