"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return React.createElement(HeroParallax, { products: products });
}

export const products = [
  {
    title: "Target Customers",
    link: "#",
    thumbnail:
      "https://www.teamly.com/blog/wp-content/uploads/2023/04/understanding-target-audience.png",
  },
  {
    title: "Machine Learning",
    link: "#",
    thumbnail:
      "https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg",
  },
  {
    title: "Segmentation",
    link: "#",
    thumbnail:
      "https://www.salesforce.com/content/dam/blogs/uk/put-customers-at-centre-of-your-business-600.jpg",
  },
  {
    title: "Marketing",
    link: "#",
    thumbnail:
      "https://cultbranding.com/ceo/wp-content/uploads/2013/08/What-is-Marketing-2.png",
  },
  {
    title: "Real Time Analysis",
    link: "#",
    thumbnail:
      "https://getthematic.com/insights/content/images/wordpress/2019/01/shutterstock_1112175710-1.jpg",
  },
  {
    title: "Demo Graphic Segmentation",
    link: "#",
    thumbnail:
      "https://cdn3.notifyvisitors.com/blog/wp-content/uploads/2022/03/What-is-demographic-segmentation.jpg",
  },
  {
    title: "Behavioral Segmentation",
    link: "#",
    thumbnail:
      "https://blog.salespanel.io/wp-content/uploads/2021/01/20945504.jpg",
  },
  {
    title: "Marketing Campaigns",
    link: "#",
    thumbnail:
      "https://goodjobs.co.in/wp-content/uploads/2023/07/Marketing-campaign-image-for-article-4939049309430393093.jpg",
  },
  {
    title: "Marketing brochures",
    link: "#",
    thumbnail:
      "https://images.smiletemplates.com/uploads/screenshots/10/0000010120/brochure-templates-b.jpg",
  },
  {
    title: "Graphs and Charts Generation",
    link: "#",
    thumbnail:
      "https://img.freepik.com/premium-vector/charts-diagrams-graphs-illustrations-business-marketing-statistics-data-analyzation_212168-709.jpg",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
