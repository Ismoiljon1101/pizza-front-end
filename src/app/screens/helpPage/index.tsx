import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  return (
    <div className="relative min-h-screen pt-2 md:pt-20 pb-20 md:pb-16">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <section className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="glass rounded-xl md:rounded-[2rem] p-2 md:p-8 relative overflow-hidden">
          <div className="mb-6 md:mb-10 text-center">
            <p className="text-[9px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">
              Support Center
            </p>
            <h1 className="mt-1 md:mt-3 text-xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
              How can we <span className="text-primary">help</span> you?
            </h1>
          </div>

          <Tabs value={value} onValueChange={setValue} className="w-full">
            <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
              <div className="lg:w-56 flex-shrink-0">
                <TabsList className="flex w-full flex-col gap-2 bg-transparent p-0 h-auto">
                  <TabsTrigger
                    className="w-full justify-start rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium data-[state=active]:glass-panel data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/10 transition-all"
                    value="1"
                  >
                    Terms & Rules
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full justify-start rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium data-[state=active]:glass-panel data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/10 transition-all"
                    value="2"
                  >
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full justify-start rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium data-[state=active]:glass-panel data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/10 transition-all"
                    value="3"
                  >
                    Contact Us
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 min-w-0">
                <TabsContent value="1" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="glass-panel space-y-3 md:space-y-4 rounded-lg md:rounded-2xl lg:rounded-3xl p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-4 md:mb-6">Terms of Service</h2>
                    {terms.map((value, number) => (
                      <div key={number} className="flex gap-2 md:gap-4">
                        <span className="flex-shrink-0 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] md:text-xs font-bold text-primary">
                          {number + 1}
                        </span>
                        <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="2" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="glass-panel rounded-lg md:rounded-2xl lg:rounded-3xl p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-4 md:mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full space-y-2 md:space-y-3">
                      {faq.map((value, number) => (
                        <AccordionItem
                          key={number}
                          value={`item-${number}`}
                          className="border-b-0 rounded-lg md:rounded-xl lg:rounded-2xl bg-white/5 px-3 md:px-6 transition-all data-[state=open]:bg-white/10"
                        >
                          <AccordionTrigger className="hover:no-underline py-3 md:py-4 text-sm md:text-base lg:text-lg font-medium">
                            {value.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-xs md:text-sm lg:text-base text-muted-foreground pb-3 md:pb-4 leading-relaxed">
                            {value.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="3" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="glass-panel space-y-4 md:space-y-8 rounded-lg md:rounded-2xl lg:rounded-3xl p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-base md:text-xl lg:text-2xl font-bold">Get in touch</h2>
                      <p className="mt-1 md:mt-2 text-xs md:text-sm lg:text-base text-muted-foreground">
                        Fill out the form below and our team will get back to you within 24 hours.
                      </p>
                    </div>

                    <form action="#" className="space-y-4 md:space-y-6">
                      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                        <div className="space-y-1 md:space-y-2">
                          <label className="text-xs md:text-sm font-medium ml-1">Your name</label>
                          <Input
                            type="text"
                            name="memberNick"
                            placeholder="John Doe"
                            className="glass-input h-10 md:h-12 rounded-lg md:rounded-xl"
                          />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                          <label className="text-xs md:text-sm font-medium ml-1">Your email</label>
                          <Input
                            type="email"
                            name="memberEmail"
                            placeholder="john@example.com"
                            className="glass-input h-10 md:h-12 rounded-lg md:rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 md:space-y-2">
                        <label className="text-xs md:text-sm font-medium ml-1">Message</label>
                        <Textarea
                          name="memberMsg"
                          placeholder="How can we help you?"
                          className="glass-input min-h-[120px] md:min-h-[150px] rounded-lg md:rounded-xl resize-none p-3 md:p-4"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" size="lg" className="rounded-lg md:rounded-xl px-6 md:px-8 shadow-lg shadow-primary/20 h-10 md:h-12">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
