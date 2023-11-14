import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"

type IconName = keyof typeof Icons;

type SurveyRadioGroupType = {
    optionsArray: string[];
}

export const SurveyRadioGroup = (props: SurveyRadioGroupType) => {
    const IconNameArray = Object.keys(Icons).filter(key => props.optionsArray.includes(key)) as IconName[];
    const FirstIcon = Icons[IconNameArray[0]];
    const SecondIcon = Icons[IconNameArray[1]];
    const ThirdIcon = Icons[IconNameArray[2]];
    const FourthIcon = Icons[IconNameArray[3]];

    return (
        <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
            <div>
                <RadioGroupItem value={props.optionsArray[0]} id={props.optionsArray[0]} className="peer sr-only" />
                <Label
                    htmlFor={props.optionsArray[0]}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <FirstIcon className="mb-3 h-6 w-6" />

                    Developer
                </Label>
            </div>
            <div>
                <RadioGroupItem
                    value="designer"
                    id="designer"
                    className="peer sr-only"
                />
                <Label
                    htmlFor="designer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <SecondIcon className="mb-3 h-6 w-6" />
                    Designer
                </Label>
            </div>
            <div>
                <RadioGroupItem value="creator" id="creator" className="peer sr-only" />
                <Label
                    htmlFor="creator"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <ThirdIcon className="mb-3 h-6 w-6" />
                    Creator
                </Label>
            </div>
            <div>
                <RadioGroupItem value="other" id="other" className="peer sr-only" />
                <Label
                    htmlFor="other"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <FourthIcon className="mb-3 h-6 w-6" />
                    Other
                </Label>
            </div>
        </RadioGroup>
    )
}