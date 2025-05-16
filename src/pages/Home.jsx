import React, { useEffect, useState } from "react";
import HeroSection from "@/component/HeroSection";
import Layout from "../component/Layout";

export default function Home() {
  return (
    <div>
      <Layout>
        <HeroSection />
      </Layout>
    </div>
  );
}
