import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function CallToActionSection() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="capitalize text-3xl text-white font-bold text-center mb-4">
          Ready to take control of your finances?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already managing their finances
          smarter with NexaWelth
        </p>
        <Link href={"/dashboard"}>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
          >
            Start Free Trial
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CallToActionSection;
