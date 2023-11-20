import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Experience = {
    institution: string;
    description: string;
    dates: string;
}

interface ShowOffSectionProps {
    title: string;
    experiences: { value: string; }[] | undefined;
}

export function ShowOffSection({ title, experiences }: ShowOffSectionProps) {
    const ExperienceArray: Experience[] = experiences ? experiences.map((experience) => {
        if(!experience || !experience.value) return ({
            institution: "",
            description: "",
            dates: "",
        })
        const [institution, dates, description] = experience.value.split(",")
        return {
            institution,
            description,
            dates,
        }
    }) : []

    return (
        <Card className="mb-6">
            <CardHeader className="pb-3">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1">
                {ExperienceArray.map((experience, index) => 
                <div key={index} className="-mx-2 rounded-md hover:bg-accent p-2 text-accent-foreground transition-all">
                    <div className="">
                        <div className="flex justify-between space-x-1">
                            <p className="text-sm font-medium leading-none">{experience.institution}</p>
                            <p className="text-sm font-medium leading-none">{experience.dates}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {experience.description}
                        </p>
                    </div>
                </div>)}
            </CardContent>
        </Card>
    )
}