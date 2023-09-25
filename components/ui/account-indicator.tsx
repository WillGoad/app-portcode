import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"

export const AccountIndicator = () => {
    return (
    <Button
        variant="outline"
        role="combobox"
        className="w-[120px] justify-between"
    >

        Will Goad        
        <Avatar className="w-auto h-auto">
            <Icons.circleUser/>
        </Avatar>
    </Button>
    );
}