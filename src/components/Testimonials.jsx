import React from "react";

const testimonialsData = [
  {
    name: "Emily S.",
    feedback:
      "Freelancers need reliable file management. FolderX simplifies handling, ensures security, and offers round-the-clock accessibility. Essential for productivity and peace of mind.",
  },
  {
    name: "John M.",
    feedback:
      "FolderX transformed file management—effortless uploads, organized folders, and access from anywhere. Undeniably a game-changer for my workflow!",
  },
  {
    name: "Sarah D.",
    feedback:
      "As a freelancer i think, FolderX is crucial. Simplifying file handling, ensuring security, and 24/7 accessibility. A reliable companion in my digital journey.",
  },
  {
    name: "Mike R.",
    feedback:
      "I'm impressed by the speed and reliability of FolderX. Whether it's uploading large files ,searching files or quick downloading the system never misses a beat.",
  },
  {
    name: "Amanda L.",
    feedback:
      "FolderX harmonizes files effortlessly. A personal assistant for data, it brings peace to my digital life. Indispensable—can't imagine managing files without it!",
  },
  {
    name: "Alex G.",
    feedback:
      "FolderX brings harmony to my files. It's like having a personal assistant for my data. An indispensable part of my digital life, making file management effortless and efficient.",
  },
];

const Testimonials = () => {
  return (
    <section className="mb-5">
      <h3 className="fs-3 text-center mb-5">Testimonials</h3>
      <div
        id="testimonialsCarousel"
        className="carousel slide container"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner position-relative">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 mx-auto">
                    <div className="card mb-3 w-lg-50">
                      <div className="card-body p-3 p-lg-5 ">
                        <p className="card-text">{testimonial.feedback}</p>
                        <small className="card-title text-danger">
                          - {testimonial.name} -
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev bg-dark"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="prev"
          style={{ top: "50%", transform: "translateY(-50%)", width: "2rem" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next bg-dark"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="next"
          style={{ top: "50%", transform: "translateY(-50%)", width: "2rem" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
