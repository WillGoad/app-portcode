'use client';

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import fs from 'fs';
import { Response } from 'node-fetch';

import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { MainNav } from "@/components/misc/main-nav"
import { UserNav } from "@/components/misc/user-nav"
import { HighlightedRepo } from "@/components/misc/highlighted-repo";
import { ShowOffSection } from "@/components/misc/show-off-section";

import { cn, deleteAllCookies } from "@/lib/utils";


const profileFormSchema = z.object({
  highlightedRepo: z.string().refine((value) => {
    const commas = value.match(/,/g)?.length
    return commas === 5 || value === ""
  }, { message: "Highlighted repo requires 5 commas" }).optional(),
  experiences: z
    .array(
      z.object({
        //Check for 2 commas if not return error
        value: z.string().refine((value) => {
          const commas = value.match(/,/g)?.length
          return commas === 2 || value === ""
        }, { message: "An experience requires 2 commas" }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  highlightedRepo: "",
  experiences: [],
}

export default function LiveEditorPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [yourJWT, setYourJWT] = useState(Cookies.get('jwt'));
  const router = useRouter();

  useEffect(() => {
    Cookies.get('user-token') && setYourJWT(Cookies.get('user-token'));
    const tempDisplayName = Cookies.get('display-name');
    tempDisplayName && setDisplayName(tempDisplayName);
    const tempUsername = Cookies.get('username')
    tempUsername && setUsername(tempUsername);
    const tempEmail = Cookies.get('user-email');
    tempEmail && setEmail(tempEmail);
  }, []);

  useEffect(() => {
    if (yourJWT && yourJWT !== "") {
      onLoad();
      fetchAndSaveQRCode();
    }
  }, [yourJWT]);

  const onLoad = async () => {
    try {
      if (!yourJWT) {
        throw new Error("No JWT found");
      }
      const response = await fetch('https://api.portco.de/api/live-editor', {
        headers: {
          'x-access-token': yourJWT,
        }
      });
      //If status code 200 then change tab
      if (response.status === 200) {
        const { displayname, username, email, highlightedRepo, experiences } = await response.json();
        setDisplayName(displayname);
        setUsername(username);
        setEmail(email);
        form.setValue("highlightedRepo", highlightedRepo);
        const expArray: string[] = experiences;
        expArray.forEach((exp, index) => {
          form.setValue(`experiences.${index}.value`, exp);
        });
        form.reset({
          ...form.getValues()
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchAndSaveQRCode = async () => {
    try {
      if (!yourJWT) {
        throw new Error("No JWT found");
      }
      const response = await fetch('https://api.portco.de/api/qr-code', {
        headers: {
          'x-access-token': yourJWT,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { qrcodeuri } = await response.json();
      setQrCode(qrcodeuri)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onUpdateProfile = async () => {
    try {
      const response = await fetch('https://api.portco.de/api/live-editor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': yourJWT || "",
        },
        body: JSON.stringify({
          highlightedRepo: form.getValues("highlightedRepo"),
          experiences: form.getValues("experiences")?.map((item: any) => item.value),
        })
      });
      //If status code 200 then change tab
      if (response.status === 200) {
        onUpdateProfileSuccess();
      }
    } catch (error) {
      onUpdateProfileError();
    }
  }

  const onUpdateProfileSuccess = () => {
    console.log("Successfully updated profile!");
  }

  const onUpdateProfileError = () => {
    console.log("Error updating profile!");
  }

  const onLogout = () => {
    deleteAllCookies();
    setYourJWT("");
    setDisplayName("");
    setUsername("");
    setEmail("");
    router.push("/signin"); // Refresh the page
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "experiences",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav displayName={displayName} email={email} handleLogout={onLogout} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Live Editor</h2>
            <div className="flex items-center space-x-2">
              <p className="text-grey-500 hover:text-blue-500">
                https://portco.de/{username}
              </p>
              <Button onClick={() => window.open(`https://portco.de/${username}`, '_blank')}>Visit</Button>
            </div>
          </div>
          <div className="flex space-x-4 h-screen">
            <div className="flex-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="highlightedRepo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highlighted Repo</FormLabel>
                        <FormControl>
                          <Input placeholder="name,link,description,main language,stars count,last updated" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave blank to not highlight a repo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    {fields.map((field, index) => (
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`experiences.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Experience
                            </FormLabel>
                            <FormDescription className={cn(index !== 0 && "sr-only")}>
                              Add jobs/work experience/internships. Each line is an experience, with name, dates and description dilineated by a comma.
                            </FormDescription>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ value: "" })}
                    >
                      Add Experience
                    </Button>
                  </div>
                  <Button type="submit" onClick={() => onUpdateProfile()}>Update profile</Button>
                </form>
              </Form>
            </div>
            <div className="flex-1 flex flex-start items-center flex-col">
              {qrCode && <img src={qrCode} alt="QR Code" />}
              <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
              <p className="text-gray-400 mb-6">@{username}</p>
              <div className="w-full sm:w-96">
                {
                  form && form.getValues("highlightedRepo") &&
                  <HighlightedRepo
                    highlightedRepo={form.getValues("highlightedRepo")}
                  />}
              </div>
              <div className="w-full sm:w-96">
                {form && form.getValues("experiences") && <ShowOffSection title={"Roles"} experiences={form.getValues("experiences")} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}