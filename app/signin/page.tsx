'use client';

//Convert to client component
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from 'next/navigation'
import { AccountIndicator } from "@/components/ui/account-indicator";
import { setUserCookies } from "@lib/utils";


export default function Onboarding() {
    const params = useSearchParams();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    //Enabled bool values for each tab
    const [emailTabDisabled, setEmailDisabled] = useState(false);
    const [confirmationTabDisabled, setConfirmationDisabled] = useState(true);
    const [currentTab, setCurrentTab] = useState("email"); //["email", "confirmation"]
    const router = useRouter();

    //Use effect only runs once
    useEffect(() => {
        if (params.get("verify") && params.get("email")) {
            setCurrentTab("confirmation");
            setCode(params.get("verify") || "");
            setEmail(params.get("email") || "");
        }
    }, []);

    //Function for changing enabled tab
    const setEnabledTab = (tab: string) => {
        if (tab === "email") {
            setEmailDisabled(false);
            setConfirmationDisabled(true);
            setCurrentTab("email");
        } else if (tab === "confirmation") {
            setEmailDisabled(true);
            setConfirmationDisabled(false);
            setCurrentTab("confirmation");
        }
    }

    const onSigninVerify = async () => {
        try {
            const response = await fetch('https://api.portco.de/api/auth/signin-verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            //If status code 200 then change tab
            if (response.status === 200) {
                setEnabledTab("confirmation");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onSignin = async () => {
        try {
            const response = await fetch('https://api.portco.de/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, email }),
            });
            // If status code 200 then change tab
            if (response.status === 200) {
                const data = await response.json();
                setUserCookies(data.username, data.displayname, data.email, data.accessToken);
                router.push("/");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //Function for when the user clicks the send code button
    const onSendCode = () => {
        //Check email is valid
        if (email.includes("@") && email.includes(".") && email.length > 5) {
            onSigninVerify();
        }
    }

    //Function for when user clicks submit Code button
    const onSubmitCode = () => {
        if (code.length === 6 && email.includes("@") && email.includes(".") && email.length > 5) {
            onSignin();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-4">
                <AccountIndicator page="signin" />
                <Tabs activationMode="automatic" value={currentTab} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger disabled={emailTabDisabled} value="email">Email</TabsTrigger>
                        <TabsTrigger disabled={confirmationTabDisabled} value="confirmation">Confirm</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email">
                        <Card>
                            <CardHeader>

                                <CardDescription>
                                    Enter the email associated with your account. We&apos;ll send you a code to confirm it&apos;s you.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">

                                    <Input id="username" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => onSendCode()}>Send Code</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="confirmation">
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Enter the code we sent to your email. Make sure to check your spam folder.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Input id="name" value={code} onChange={e => setCode(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => onSubmitCode()}>Submit</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )

}