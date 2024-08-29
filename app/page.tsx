"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, Schema, z } from "zod";

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
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Tiptap";
import Sidebar from "@/components/Sidebar";

const formSchema = z.object({
  body: z.string().min(1, {
    message: "Body must be at least 1 character",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // mode: "onChange",
    defaultValues: {
      body: "",
    },
  });

  const { register, setValue, getValues } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { body } = values;

    console.log("Submitted: ->");
    console.log("Body: ", body);
  }

  const handleBodyChange = (body: string) => {
    form.setValue("body", body);
  };

  console.log(form.formState.errors);

  return (
    <div>
      <main className="flex flex-col items-center justify-between p-24">
        <div className="z-10 max-w-8xl items-center justify-between font-mono text-sm lg:flex">
          <div className="grid grid-cols-4 ">
            <div className="col-span-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                </form>
              </Form>
            </div>

            <div className="">
              <Sidebar></Sidebar>
            </div>
          </div>
        </div>
      </main>

      <div className="flex flex-col items-center justify-between p-24">
        <div className="z-10 max-w-8xl items-center justify-between font-mono text-sm lg:flex flex-1 w-full">
          {/* Bottom buttons */}
          <div className="flex items-center flx-1 gap-4 w-full ">
            <div className="">
              <Button type="submit">Publish</Button>
              <Button type="submit" className="bg-slate-400">
                Save draft
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="duplicate" />
              <label
                htmlFor="duplicate"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Make a duplication
              </label>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-end">
              <Button type="submit" className="flex items-end bg-slate-400">
                Send Test Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
