import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AccountIndicatorProps {
    page: string;
}

export const AccountIndicator = (props: AccountIndicatorProps) => {

    return (
        <Button
            asChild={true}
            variant="outline"
            role="combobox"
            className="w-[120px] justify-center gap-5"
        >

            {props.page === "signin" ? <Link href="/onboarding">Sign up</Link> : <Link href="/signin">Sign in</Link>}
        </Button>
    );
}