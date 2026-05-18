import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function IssueFilters({ value, onChange }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList className="w-full h-9 bg-muted rounded-none border-b border-border">
        <TabsTrigger value="all" className="flex-1 text-xs rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          All
        </TabsTrigger>
        <TabsTrigger value="critical" className="flex-1 text-xs rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Critical
        </TabsTrigger>
        <TabsTrigger value="in-progress" className="flex-1 text-xs rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          In Progress
        </TabsTrigger>
        <TabsTrigger value="resolved" className="flex-1 text-xs rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          Resolved
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
