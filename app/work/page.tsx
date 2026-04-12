import { WorkTitle } from '@/components/work-title'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'

export default function WorkPage() {
  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <WorkTitle />
      <FeaturedProjects />
    </main>
  )
}
