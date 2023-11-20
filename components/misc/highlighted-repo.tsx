import {
    CircleIcon,
    StarIcon,
    ArrowTopRightIcon
  } from "@radix-ui/react-icons"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  interface HighlightedRepoProps {
    highlightedRepo?: string
  }
  
  export function HighlightedRepo({ highlightedRepo }: HighlightedRepoProps) {
    const title = highlightedRepo?.split(",")[0] ?? ""
    const link = highlightedRepo?.split(",")[1] ?? ""
    const description = highlightedRepo?.split(",")[2] ?? ""
    const mainlang = highlightedRepo?.split(",")[3] ?? ""
    const stars = Number(highlightedRepo?.split(",")[4]) ?? 0
    const updated = highlightedRepo?.split(",")[5] ?? ""
    return (
      <Card className="mb-6">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            {title !== "" && <CardTitle>{title}</CardTitle>}
            {description !== "" && <CardDescription>
              {description}
            </CardDescription>}
          </div>
          {link !== "" && <div className="flex items-center rounded-md bg-secondary text-secondary-foreground justify-center">
            <Button onClick={() => window.open(link, '_blank')} variant="secondary" className="shadow-none flex justify-center px-2">
              <ArrowTopRightIcon className="h-4 w-4" /> Visit
            </Button>
          </div>}
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            {mainlang !== "" && <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              {mainlang}
            </div>}
            {stars && <div className="flex items-center">
              <StarIcon className="mr-1 h-3 w-3" />
              {stars > 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
            </div>}
            {updated !== "" && <div>Updated {updated}</div>}
          </div>
        </CardContent>
      </Card>
    )
  }