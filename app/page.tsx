"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Tiptap from "@/components/Tiptap";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  body: z.string().min(1, {
    message: "Body must be at least 1 character",
  }),
  date: z.string().min(1, {
    message: "Date must be at least 1 character",
  }),
  subject: z.string().min(1, {
    message: "Subject must be at least 1 character",
  }),
  recipient: z
    .string()
    .min(1, {
      message: "Recipient email must be at least 1 character",
    })
    .email(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // mode: "onChange",
    defaultValues: {
      body: "",
      subject: "",
      recipient: "",
      date: "",
    },
  });

  const { register } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { body, date, subject, recipient } = values;

    console.log("Submitted: ->");
    console.log("Body: ", body);
    console.log("Subject: ", subject);
    console.log("Recipient: ", recipient);
    console.log("Date: ", date);
  }

  const handleBodyChange = (body: string) => {
    form.setValue("body", body);
  };

  // console.log(form.formState.errors);

  return (
    <div>
      <main className="flex flex-col items-center justify-between p-24">
        <div className="z-10 max-w-8xl items-center justify-between font-mono text-sm lg:flex">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-4 ">
                <div className="col-span-3">
                  <div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden min-h-96 p-4">
                      {/* Body */}
                      <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Body</FormLabel>
                            {/* <hr/> */}
                            <FormControl>
                              <div>
                                <Tiptap
                                  body={field.name}
                                  onChange={handleBodyChange}
                                ></Tiptap>
                                <input type="hidden" {...register("body")} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  {/* Sidebar */}
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden p-4 min-h-96">
                    <div className="grid grid-rows-3 grid-flow-col gap-4 flex justify-center">
                      <div>
                        {/* Subject */}
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Subject
                              </FormLabel>
                              <FormControl>
                                <div>
                                  <Input
                                    className="focus:outline-none"
                                    type="text"
                                    {...register("subject")}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        {/* Recipient */}
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Recipient
                              </FormLabel>
                              <FormControl>
                                <div>
                                  <Input
                                    className="focus:outline-none"
                                    type="text"
                                    {...register("recipient")}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        {/* Schedule */}
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Schedule
                              </FormLabel>
                              <FormControl>
                                <div>
                                  <input
                                    className="focus:outline-none"
                                    type="datetime-local"
                                    {...register("date")}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="flex items-center flex-1 gap-2 w-full ">
                <div>
                  <Button type="submit" className="bg-zinc-950 dark:bg-white">
                    Publish
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-gray-200"
                  >
                    Save Draft
                  </Button>
                </div>

                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="duplicate" name="duplicate" />
                    <label
                      htmlFor="duplicate"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Make a duplication
                    </label>
                  </div>
                </div>

                <div className="flex-1"></div>
                <div className="flex items-end">
                  <Button
                    type="submit"
                    variant="outline"
                    className="flex items-end bg-gray-200"
                  >
                    Send Test Email
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
