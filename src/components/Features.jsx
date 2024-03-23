import React from "react";

const Features = () => {
  const features = [
    {
      iconClass: "bx bx-folder bg-danger text-white p-2 rounded",
      title: "Folder Organization",
      description: "Intuitive folders for easy and efficient file management.",
    },
    {
      iconClass: "bx bx-devices bg-success text-white p-2 rounded",
      title: "Mobile Accessibility",
      description: "Access files conveniently from mobile devices anytime.",
    },
    {
      iconClass: "bx bx-cloud-upload bg-primary text-white p-2 rounded",
      title: "Easy File Upload",
      description:
        "Seamlessly upload files of any type with just a few clicks.",
    },
    {
      iconClass: "bx bx-file-blank bg-warning text-white p-2 rounded",
      title: "File Preview",
      description:
        "Preview files without additional software for quick accessibility.",
    },
  ];

  return (
    <section className="container my-lg-5 pt-md-3" id="features">
      <h3 className="text-uppercase mb-4 mb-lg-5 fs-3 ">Features</h3>

      <div className="row pb-lg-5 py-3">
        {features.map((feature, index) => (
          <div key={index} className="col-lg-3 col-sm-6 pb-4 pb-lg-0">
            <div className="icon pb-3">
              <i className={feature.iconClass}></i>
            </div>
            <div className="desc">
              <h5>{feature.title}</h5>
              <p className="text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
