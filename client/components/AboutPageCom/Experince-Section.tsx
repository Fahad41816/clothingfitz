"use client";

import { motion } from "framer-motion";
import { Building2, Award, Briefcase } from "lucide-react";

const experiences = [
  {
    icon: Building2,
    title: "Industry Leadership",
    description:
      "Pioneering print-on-demand innovation for over 8 years with cutting-edge technology",
  },
  {
    icon: Award,
    title: "Award-Winning Quality",
    description:
      "Recognized for excellence in craftsmanship and customer satisfaction worldwide",
  },
  {
    icon: Briefcase,
    title: "Expert Team",
    description:
      "Dedicated professionals bringing 200+ years of combined experience to every project",
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <p className="text-lg text-muted-foreground">
            What makes ClothingFitz different
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-card border border-primary/20 rounded-xl p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all h-full">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
