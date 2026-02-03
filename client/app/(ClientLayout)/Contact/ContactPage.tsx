"use client";

import ContactForm from "@/components/ContactPageCom/ContactPage-form";
import ContactInfo from "@/components/ContactPageCom/ContactPage-Info";
import { motion } from "framer-motion";

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="px-4 py-20 text-center "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-2 text-sm font-medium text-primary"
          variants={itemVariants}
        >
          Contact us
        </motion.p>

        <motion.h1
          className="mb-6 text-4xl font-serif font-bold md:text-5xl lg:text-6xl text-balance"
          variants={itemVariants}
        >
          Get in Touch
        </motion.h1>

        <motion.p
          className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance"
          variants={itemVariants}
        >
          Have questions or feedback? Feel free to contact us using the form
          below or through our contact details.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="px-4 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </motion.section>
    </main>
  );
};

export default ContactPage;
