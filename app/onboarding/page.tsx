import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Onboarding() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="confirmation">Confirm</TabsTrigger>
                        <TabsTrigger value="survey">Survey</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email">
                        <Card>
                            <CardHeader>
                                <CardTitle>1 of 3</CardTitle>
                                <CardDescription>
                                    Add an email to use with your account. We'll send you a code to confirm it's you.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" defaultValue="Ryan Hoover" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Email</Label>
                                    <Input id="username" defaultValue="ryan@producthunt.com" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Send Code</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="confirmation">
                        <Card>
                            <CardHeader>
                                <CardTitle>2 of 3</CardTitle>
                                <CardDescription>
                                    Enter the code we sent to your email. Make sure to check your spam folder.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Code</Label>
                                    <Input id="name" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Submit</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="survey">
                        <Card>
                            <CardHeader>
                                <CardTitle>3 of 3</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="@peduarte" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )

}