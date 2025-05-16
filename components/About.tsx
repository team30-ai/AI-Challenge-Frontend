"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Book, ExternalLink, Heart } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About AIoife</h1>
          <p className="text-lg text-gray-600">
            Preventing avoidable deaths through AI-powered hospital monitoring
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Aoife's Story */}
            <div>
              <h2 className="text-2xl font-bold flex items-center mb-4">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Aoife Johnston&apos;s Story
              </h2>
              <p className="mb-4">
                In December 2022, 16-year-old Aoife Johnston arrived at University
                Hospital Limerick (UHL) with severe sepsis. Despite the seriousness
                of her condition, she spent 16 hours waiting on a hospital trolley
                in the emergency department before receiving antibiotics.
                Tragically, Aoife died from complications of bacterial meningitis.
              </p>
              <p className="mb-4">
                An investigation found that her death was potentially preventable
                if she had received timely care. The hospital was experiencing
                severe overcrowding that night, with staff unable to provide
                adequate attention to all patients.
              </p>
              <p className="mb-4">
                Aoife&apos;s story is not unique. The Irish healthcare system has
                struggled with emergency department overcrowding for years, with
                patients routinely waiting on trolleys for extended periods. During
                peak overcrowding, these delays can become deadly.
              </p>
              <div className="bg-blue-50 p-4 rounded-md my-6 border-l-4 border-blue-500">
                <blockquote className="italic text-gray-700">
                  &quot;If it wasn&quot;t so overcrowded, if there were enough staff, if the
                  sepsis tools were used properly... all those things combined...
                  Aoife would most likely still be with us today.&quot;
                </blockquote>
                <p className="mt-2 font-semibold">
                  — Carol Fitzpatrick, Aoife&apos;s mother
                </p>
              </div>
            </div>

            <Separator />

            {/* The AIoife Project */}
            <div>
              <h2 className="text-2xl font-bold mb-4">The AIoife Project</h2>
              <p className="mb-4">
                Named in honor of Aoife Johnston, AIoife (AI for Overcrowding
                Intelligence and Fatality Elimination) is a system designed to
                prevent similar tragedies by monitoring hospital overcrowding in
                real-time and providing early warnings when conditions become
                dangerous.
              </p>
              <p className="mb-4">
                Using artificial intelligence, AIoife analyzes multiple data points
                from hospitals across Ireland, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Number of patients on ED trolleys</li>
                <li>Number of patients on ward trolleys</li>
                <li>Delayed transfers of care</li>
                <li>Elderly patients waiting more than 24 hours</li>
                <li>Hospital capacity and staffing levels</li>
              </ul>
              <p className="mb-4">
                By analyzing these factors, the system can identify when a hospital
                is at risk of reaching dangerous overcrowding levels and alert
                healthcare administrators before patients are put at risk.
              </p>
            </div>

            <Separator />

            {/* Expert Findings */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Expert Findings</h2>
              <p className="mb-4">
                The Royal College of Emergency Medicine has found that there is one
                excess death for approximately every 67 patients that spend 8–12
                hours in an emergency department. When patients wait longer, the
                risk increases further.
              </p>
              <p className="mb-4">
                In January 2023, the Irish Patients&apos; Association estimated that
                as many as 350 people may die each year due to emergency department
                overcrowding in Ireland.
              </p>
              <p className="mb-4">
                These findings highlight the urgent need for better monitoring and
                management of hospital capacity to prevent avoidable deaths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="flex items-center" asChild>
                  <a
                    href="https://www.rcem.ac.uk/docs/Policy/ED_crowding_overview.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Royal College Report
                  </a>
                </Button>
                <Button variant="outline" className="flex items-center" asChild>
                  <a
                    href="https://www.hse.ie/eng/services/publications/hospitals/trolley-gar-2018.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Book className="mr-2 h-4 w-4" />
                    HSE Capacity Review
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Help Prevent the Next Tragedy</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            AIoife was created to ensure no other family loses a loved one due to
            preventable hospital overcrowding. Join us in our mission to save
            lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">View Hospital Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
