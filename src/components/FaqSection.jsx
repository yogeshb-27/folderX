import React, { useState } from "react";

const FaqSection = () => {
  const faqData = [
    {
      question: "How much storage space do I get with a free account?",
      answer:
        "With a free account, you get 50 MB of storage space. If you need more storage, you can check our pricing page for affordable upgrade options.",
    },
    {
      question: "What file types are supported for upload?",
      answer:
        "Our system supports a diverse range of file types, including documents, images, videos, and more. You can easily upload and manage various file formats to meet your needs.",
    },
    {
      question: "Are there any restrictions on file sizes?",
      answer:
        "Yes, we have a file size restriction of 15 MB. Ensure your files meet this limit for seamless uploading and efficient file management.",
    },
    {
      question: "Can I access my files from mobile devices?",
      answer:
        "Yes, our platform is fully mobile-responsive. Access your files on the go from any device, ensuring convenience and flexibility in managing your documents anytime, anywhere.",
    },
    {
      question: "What happens if I reach my storage limit?",
      answer:
        "Upon reaching your storage limit, you'll receive timely notifications. To continue enjoying additional storage capacity, consider upgrading your plan for a seamless file management experience.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-100 container">
      <h3 className="fs-3 mb-5 text-center">Frequntly Asked Questions</h3>
      <div
        className="accordion accordion-flush text-start px-2 px-lg-5 mb-5"
        id="accordionFlushExample"
      >
        {faqData.map((faq, index) => (
          <div key={index} className="accordion-item mx-lg-5">
            <h3 className="accordion-header" id={`faqHeading${index}`}>
              <button
                className={`accordion-button ${
                  activeIndex === index ? "" : "collapsed"
                } px-lg-5`}
                type="button"
                onClick={() => handleAccordionClick(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faqCollapse${index}`}
              >
                {faq.question}
              </button>
            </h3>
            <div
              id={`faqCollapse${index}`}
              className={`accordion-collapse collapse  ${
                activeIndex === index ? "show" : ""
              }`}
              aria-labelledby={`faqHeading${index}`}
            >
              <div className="accordion-body p-3 px-lg-5">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
