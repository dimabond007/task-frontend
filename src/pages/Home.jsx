import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  return (
    <div className="container mx-auto py-12 text-secondary-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome to TaskManager
        </h1>
        <p className="text-lg ">
          A powerful tool to manage your tasks efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Create Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Easily create and manage your tasks with our intuitive interface.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organize Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Organize your tasks with drag and drop, prioritize them, and stay
              on top of your work.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track the progress of your tasks and achieve your goals
              efficiently.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-12">
        <Link to="/task">
          <Button className="bg-primary  px-4 py-2 rounded-md">
            Get Started
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Features</h2>
          <ul className="list-disc list-inside text-lg ">
            <li>Create, edit, and delete tasks</li>
            <li>Organize tasks into categories</li>
            <li>Prioritize tasks by dragging and dropping</li>
            <li>Set deadlines and reminders</li>
            <li>Track progress with completion status</li>
            <li>Collaborate with team members</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Testimonials</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 ">
                <CardDescription className="text-secondary-foreground">
                  "TaskManager has revolutionized the way I handle my projects.
                  The drag-and-drop feature is a game-changer!" - Alex P.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 ">
                <CardDescription className="text-secondary-foreground">
                  "The ability to track my tasks' progress and collaborate with
                  my team in one place has boosted our productivity." - Sarah W.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 ">
                <CardDescription className="text-secondary-foreground">
                  "Simple, intuitive, and highly effective. TaskManager is the
                  best task management tool I've used." - John D.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Ready to Get Started?
        </h2>
        <Link to="/task">
          <Button className="bg-primary  px-4 py-2 rounded-md">
            Start Creating Tasks
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
