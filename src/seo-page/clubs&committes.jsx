"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Loader from "@/components/Loader";

/* =====================================================
   EMBLA SLIDER (NO refs exposed, CSS untouched)
===================================================== */
function EmblaRow({ data = {}, onSelect, activeItem }) {
  const hasItems = Object.keys(data).length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    hasItems
      ? {
          align: "start",
          dragFree: false,
        }
      : undefined,
  );

  if (!hasItems) return null; // ⛔ CRITICAL

  return (
    <div className="cards-slider">
      {/* ✅ EMBLA VIEWPORT */}
      <div className="cards-viewport" ref={emblaRef}>
        {/* ✅ EMBLA CONTAINER */}
        <div className="cards-row">
          {Object.entries(data).map(([key, item]) => (
            <div className="card-wrapper" key={key}>
              <div
                className={`image-card ${
                  activeItem?.title === item.title ? "active" : ""
                }`}
                onClick={() => onSelect?.(item)}
              >
                <img src={item.img} alt={item.title} />
                <div className="card-overlay">
                  <h5>{item.title.split(" – ")[0]}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* arrows */}
      {/* arrows */}
      <div className="slider-controls club-tab-mobile-arrows">
        <button className="nav-btn" onClick={() => emblaApi?.scrollPrev()}>
          &lt;
        </button>
        <button className="nav-btn" onClick={() => emblaApi?.scrollNext()}>
          &gt;
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   STUDENT SLIDER (SAME CSS STRUCTURE)
===================================================== */
function StudentSlider({ students }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    duration: 14,
  });

  return (
    <div className="student-slider-container">
      <button
        className="student-nav prev-btn btn btn-warning"
        onClick={() => emblaApi?.scrollPrev(true)}
      >
        &lt;
      </button>

      {/* embla viewport */}
      <div className="student-track-window" ref={emblaRef}>
        {/* embla container */}
        <div className="student-track">
          {students.map((s, i) => (
            <div className="student-card-wrapper" key={i}>
              <div className="member-card">
                <img src={s.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="student-nav next-btn btn btn-warning"
        onClick={() => emblaApi?.scrollNext(true)}
      >
        &gt;
      </button>
    </div>
  );
}

/* =====================================================
   PAGE
===================================================== */
export default function ClubsAndCommittees() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clubData, setClubData] = useState({});

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/club-communities-seo`,
        );
        const json = await res.json();
        if (json?.length) setPageData(json[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/club-imt-data`,
        );
        const json = await res.json();

        if (json?.success && json.data?.length) {
          const formatted = {};

          json.data.forEach((item, index) => {
            formatted[index + 1] = {
              title: item.tab_title,
              img: `${process.env.NEXT_PUBLIC_API_URL}${item.tab_image}`,
              content: item.tab_content,

              mentor: {
                img: `${process.env.NEXT_PUBLIC_API_URL}${item.tab_main_image}`,
              },
              students: item.our_events.map((img) => ({
                img: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
              })),
            };
          });

          setClubData(formatted);
          setActiveClub(formatted[1]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchClubs();
  }, []);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/committees-imt-data`,
        );
        const json = await res.json();

        if (json?.success && json.data?.length) {
          const formatted = {};

          json.data.forEach((item, index) => {
            formatted[index + 1] = {
              title: item.tab_title,
              img: `${process.env.NEXT_PUBLIC_API_URL}${item.tab_image}`,
              content: item.tab_content,
              mentor: {
                img: `${process.env.NEXT_PUBLIC_API_URL}${item.tab_main_image}`,
              },
              students: item.our_events.map((img) => ({
                img: `${process.env.NEXT_PUBLIC_API_URL}${img}`,
              })),
            };
          });

          setCommitteeData(formatted);
          setActiveCommittee(formatted[1]); // ✅ default active
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommittees();
  }, []);

  const [activeClub, setActiveClub] = useState(null);

  const [committeeData, setCommitteeData] = useState({});
  const [activeCommittee, setActiveCommittee] = useState(null);

  const [eventsEmblaRef, eventsEmblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  /* Loader */
  if (loading) return <Loader fullScreen />;

  return (
    <>
      {/* HERO */}
      <section className="faculty-section">
        <div
          className="faculty-hero text-center text-white py-5"
          style={{
            background: pageData?.banner_image
              ? `url(${process.env.NEXT_PUBLIC_API_URL}${pageData.banner_image})`
              : "none",
            backgroundSize: "cover",
            height: "60vh",
            backgroundPosition: "center",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: pageData?.banner_text || "",
            }}
          />
        </div>

        <div
          className="breadcrumb p-4"
          style={{ backgroundColor: "rgb(22, 57, 119)" }}
        >
          <Link href="/" className="text-white fw-bold">
            Home
          </Link>
          <span className="text-warning fw-bold ms-2">
            {pageData?.page_title}
          </span>
        </div>
      </section>

      {/* STUDENT LIFE */}
      <section className="py-5">
        <div className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: pageData?.student_life_imt || "",
            }}
          />
        </div>
      </section>

      {/* CLUBS */}
      <section className="py-5">
        <div className="container">
          <h2
            className="section-title text-center"
            style={{ color: "#08317a" }}
          >
            CLUBS @ IMT
          </h2>

          <div className="slider-container clubs">
            <EmblaRow
              data={clubData}
              onSelect={setActiveClub}
              activeItem={activeClub}
            />
          </div>

          {activeClub && (
            <div className="container mt-4">
              <div className="card detail-card" style={{ display: "block" }}>
                <div className="card-body">
                  {/* <h4 className="card-title text-center">{activeClub.title}</h4> */}

                  <div
                    dangerouslySetInnerHTML={{ __html: activeClub.content }}
                  />

                  {activeClub.links && activeClub.links.length > 0 && (
                    <div className="mt-4">
                      <div className="d-flex justify-content-start gap-3">
                        {activeClub.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                          >
                            <i className={link.icon}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mentor-section text-center mt-5">
                    <div className="d-flex justify-content-center">
                      <div className="member-card">
                        <img src={activeClub.mentor.img} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="student-section mt-5">
                    <h4 className="text-center text-uppercase fw-bold mb-4">
                      Our Events
                    </h4>
                    <StudentSlider students={activeClub.students} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* EVENTS SECTION (RESTORED) */}
      <section className="video-carousel-section py-5">
        <div className="container-fluid position-relative">
          <h2 className="text-center fw-bold mb-4 text-warning">Events</h2>

          {/* LEFT ARROW */}
          <button
            className="event-arrow prev"
            onClick={() => eventsEmblaApi?.scrollPrev()}
          >
            &lt;
          </button>

          {/* RIGHT ARROW */}
          <button
            className="event-arrow next"
            onClick={() => eventsEmblaApi?.scrollNext()}
          >
            &gt;
          </button>

          {/* EMBLA VIEWPORT */}
          <div className="events-viewport" ref={eventsEmblaRef}>
            {/* EMBLA CONTAINER */}
            <div className="events-row">
              {["1.webp", "2.webp", "3.webp", "4.webp"].map((img, i) => (
                <div className="events-slide" key={i}>
                  <div className="image-wrapper">
                    <img
                      src={`/media/events/${img}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMITTEES */}
      <section className="py-5">
        <div className="container">
          <h2
            className="section-title text-center"
            style={{ color: "#08317a" }}
          >
            COMMITTEES @ IMT
          </h2>

          <div className="slider-container committees">
            <EmblaRow
              data={committeeData}
              onSelect={setActiveCommittee}
              activeItem={activeCommittee}
            />
          </div>

          {activeCommittee && (
            <div className="container mt-4">
              <div
                className="card detail-card"
                style={{ color: "#08317a", display: "block" }}
              >
                <div className="card-body">
                  {/* <h4 className="card-title text-center">
                    {activeCommittee.title}
                  </h4> */}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: activeCommittee.content,
                    }}
                  />

                  <div className="mentor-section text-center mt-5">
                    <div className="d-flex justify-content-center">
                      <div className="member-card">
                        <img src={activeCommittee.mentor.img} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="student-section mt-5">
                    <h4 className="text-center text-uppercase fw-bold mb-4">
                      Our Events
                    </h4>
                    <StudentSlider students={activeCommittee.students} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* EVENTS CALENDAR (RESTORED) */}
      <section className="events-calendar-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4 text-warning">
            Events Calendar
          </h2>

          <div className="row g-4">
            <div className="col-md-4 col-sm-6">
              <div className="event-card">
                <div className="event-date">
                  <span className="day">15</span>
                  <span className="month">Oct</span>
                </div>
                <div className="event-info">
                  <h5 className="event-title">Tech Workshop</h5>
                  <p className="event-time">10:00 AM - 1:00 PM</p>
                  <p className="event-location">Auditorium, Block A</p>
                  <button className="btn btn-warning btn-sm view-details">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="event-card">
                <div className="event-date">
                  <span className="day">22</span>
                  <span className="month">Oct</span>
                </div>
                <div className="event-info">
                  <h5 className="event-title">Art Exhibition</h5>
                  <p className="event-time">2:00 PM - 5:00 PM</p>
                  <p className="event-location">Gallery Hall</p>
                  <button className="btn btn-warning btn-sm view-details">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="event-card">
                <div className="event-date">
                  <span className="day">30</span>
                  <span className="month">Oct</span>
                </div>
                <div className="event-info">
                  <h5 className="event-title">Music Concert</h5>
                  <p className="event-time">6:00 PM - 9:00 PM</p>
                  <p className="event-location">Open Ground</p>
                  <button className="btn btn-warning btn-sm view-details">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
    .faculty-hero {
  background: url('/media/banners/annualevents.webp');
  position: relative;
  background-size: cover;
  height: 60vh;
  background-position: center !important;
}
.faculty-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}
.faculty-hero h2,
.faculty-hero p {
  position: relative;
  z-index: 1;
}
.faculty-hero h2 {
  margin-top: 150px;
}
.batch-badge {
  display: none !important;
}

/* =========================
   Member Card
========================= */
.member-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  background: #fff;
  transition: transform 0.3s ease;
}
.member-card:hover {
  transform: translateY(-5px);
}
.member-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: top center;
}
.member-card .member-info {
  display: none !important;
}

/* =========================
   STUDENT SLIDER
========================= */
.student-slider-container {
  position: relative;
  padding: 0 50px;
}
.student-track-window {
  overflow: hidden;
  width: 100%;
}
.student-track {
  display: flex;
  gap: 20px;
}
.student-card-wrapper {
  flex-shrink: 0;
  width: 100%;
}
@media (min-width: 992px) {
  .student-card-wrapper {
    width: calc((100% - 40px) / 3);
  }
}
.student-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =========================
   IMAGE CARD
========================= */
.image-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  height: 160px;
}
.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-card.active {
  border-bottom: 12px double #ffc107;
  background-color: #163977;
}
.card-overlay {
  position: absolute;
  bottom: 0;
  inset-inline: 0;
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 8px 12px;
}

/* =========================
   EMBLA CORE (CRITICAL FIX)
========================= */
.cards-slider {
  position: relative;
  width: 100%;
  overflow: visible; /* 👈 IMPORTANT */
}

.cards-viewport {
  overflow: hidden;
  width: 100%;
}
.cards-row {
  display: flex;
  margin: 0;
  padding: 0;
}
.card-wrapper {
  flex: 0 0 auto;
  padding: 0 5px; /* replaces gap */
  box-sizing: border-box;
}

/* =========================
   SLIDER CONTROLS
========================= */
.slider-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
}

.nav-btn {
  pointer-events: all;
}

.nav-btn {
  background: #ffc107;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
}

/* =========================
   DESKTOP
========================= */
@media (min-width: 992px) {
  .clubs .card-wrapper {
    flex-basis: 12.5%; /* 8 */
  }
  .committees .card-wrapper {
    flex-basis: 16.6667%; /* 6 */
  }
  .image-card {
    height: 150px;
  }

}

/* =========================
   TABLET
========================= */
@media (min-width: 768px) and (max-width: 991.98px) {
  .card-wrapper {
    flex-basis: 33.3333%;
  }
  .image-card {
    height: 140px;
  }
}

/* =========================
   MOBILE (FIXED)
========================= */
@media (max-width: 767.98px) {
  .card-wrapper {
    flex-basis: 50%;
  }
  .image-card {
    height: 160px;
  }
  .cards-slider {
    padding: 0 10px;
  }
}

/* =========================
   EVENTS & CALENDAR
========================= */
.video-carousel-section,
.events-calendar-section {
  background: #163977;
  overflow: hidden;
}
.image-wrapper img {
  display: block;
  width: 100%;
  border-radius: 10px;
}
.event-card {
  display: flex;
  align-items: center;
  background: #d4d4d4;
  border-radius: 12px;
  padding: 15px;
}
.event-date {
  background: #ffb433;
  color: #163977;
  border-radius: 12px;
  padding: 10px;
  width: 60px;
  margin-right: 15px;
}
  .prev-btn {
  position: absolute;
   left: -25px;
}

.next-btn {
  position: absolute;
  right: -25px;
}

.cards-slider {
  position: relative;
}
  .events-viewport {
  overflow: hidden;
  width: 100%;
}

.events-row {
  display: flex;
}

.events-slide {
  flex: 0 0 25%; /* 4 slides desktop */
  padding: 0 12px;
  box-sizing: border-box;
}

@media (max-width: 991px) {
  .events-slide {
    flex: 0 0 50%; /* 2 slides tablet */
  }
}

@media (max-width: 576px) {
  .events-slide {
    flex: 0 0 100%; /* 1 slide mobile */
  }
}

/* ARROWS */
.event-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  background: #ffc107;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 18px;
  cursor: pointer;
}

.event-arrow.prev {
  left: 10px;
    top: 63%;
}

.event-arrow.next {
  right: 10px;
  top: 63%;
}
.club-tab-mobile-arrows {
  display: none;
  position: static;       /* remove absolute positioning */
  transform: none;
  margin-top: 15px;
  justify-content: center;
  gap: 16px;
}

/* Show ONLY on mobile */
@media (max-width: 767.98px) {
  .club-tab-mobile-arrows {
    display: flex;
  }

  /* reset nav button positioning */
  .club-tab-mobile-arrows .nav-btn {
    position: static;
  }
}
    `,
        }}
      />
    </>
  );
}
