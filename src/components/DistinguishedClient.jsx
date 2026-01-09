"use client";

import React from "react";
import Image from "next/image";

const DistinguishedClientsSection = ({  emblaRef }) => {

      const clients = [
        { src: "/media/eeclients/1.jpg", alt: "Logo 1" },
        { src: "/media/eeclients/2.png", alt: "Logo 2" },
        { src: "/media/eeclients/3.jpg", alt: "Logo 3" },
        { src: "/media/eeclients/4.png", alt: "Logo 4" },
        { src: "/media/eeclients/5.jpg", alt: "Logo 5" },
        { src: "/media/eeclients/6.jpg", alt: "Logo 6" },
        { src: "/media/eeclients/7.png", alt: "Logo 7" },
        { src: "/media/eeclients/8.png", alt: "Logo 8" },
        { src: "/media/eeclients/9.jpg", alt: "Logo 9" },
        { src: "/media/eeclients/10.jpeg", alt: "Logo 10" },
        { src: "/media/eeclients/11.png", alt: "Logo 11" },
      ];
  return (
    <section className="placement-alliances-section py-4" data-aos="fade-up">
      <div className="container text-center">
        <h6 className="subtitle text-warning">Our Clients</h6>
        <h2 className="section-title mb-4">Our Distinguished Clients</h2>
        <p className="mb-5">
          We are proud to be associated with top companies.
        </p>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {clients.map((client, index) => (
              <div className="embla__slide" key={index}>
                <div className="logo-box">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={140}
                    height={80}
                    style={{ objectFit: "contain" }}
                    priority={index < 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinguishedClientsSection;
