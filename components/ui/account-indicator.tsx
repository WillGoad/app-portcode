import { getCookie } from 'cookies-next';

import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"
import { DISPLAY_NAME, USER_TOKEN } from '@lib/constants';
import Link from "next/link"

interface AccountIndicatorProps {
    page: string;
}


export const AccountIndicator = (props: AccountIndicatorProps) => {
    const JWT = getCookie(USER_TOKEN);
    const username = getCookie(DISPLAY_NAME);

    return (
        <Button
            asChild={!JWT && !username && true}
            variant="outline"
            role="combobox"
            className="w-[120px] justify-center gap-5"
        >

            {JWT && username ? <>{username}<Avatar className="w-auto h-auto">
                <Icons.circleUser />
            </Avatar></> : props.page === "signin" ? <Link href="/onboarding">Sign up</Link> : <Link href="/signin">Sign in</Link>}
        </Button>
    );
}