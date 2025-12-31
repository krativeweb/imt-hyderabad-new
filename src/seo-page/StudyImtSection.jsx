// app/studying/page.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternationalAssociationStickyBtns from "@/components/internationalassotianstickybtns.jsx";
export default function StudyingPage() {
  // -----------------------------------------------------------------
  // Initialise AOS (once, client-side only)
  // -----------------------------------------------------------------
  const [pageData, setPageData] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init({
        duration: 1200,
        once: true,
      });
    }
  }, []);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/mandatory/slug/studying-at-imt-hyderabad`
        );
        const json = await res.json();
        setPageData(json);
      } catch (err) {
        console.error("Failed to fetch studying page:", err);
      }
    };

    fetchPage();
  }, []);
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className="faculty-section">
        <div
          className="faculty-hero text-center text-white py-5"
          style={{
            background: `url(${
              pageData?.banner_image
                ? `${process.env.NEXT_PUBLIC_API_URL}${pageData.banner_image}`
                : "/media/banners/aboutus.webp"
            })`,
            position: "relative",
            backgroundSize: "cover",
            height: "60vh",
          }}
        >
          {pageData?.banner_text ? (
            <div dangerouslySetInnerHTML={{ __html: pageData.banner_text }} />
          ) : (
            <>
              <h2 className="display-5 fw-bold mb-2">
                Studying at IMT Hyderabad
              </h2>
              <p className="text-white">
                A community where students grow, collaborate, and lead.
              </p>
            </>
          )}
        </div>

        {/* Breadcrumb */}
        <div
          className="breadcrumb p-4"
          style={{ backgroundColor: "rgb(22 57 119)" }}
        >
          <div className="container-fluid">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent p-0 m-0">
                <li className="breadcrumb-item">
                  <Link
                    style={{ textDecoration: "none" }}
                    href="/"
                    className="text-white fw-bold"
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active text-warning fw-bold"
                  aria-current="page"
                >
                  Studying at IMT Hyderabad
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <InternationalAssociationStickyBtns />
        {/* ===== MAIN CONTENT ===== */}
        <div className="container py-3">
          {/* Header */}
          <div className="section-header">
            <h2
              className="section-title text-center mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Studying at IMT Hyderabad
            </h2>
          </div>

          {/* ==== TABS ==== */}
          <div className="tabs-container">
            <ul
              className="nav nav-pills justify-content-center flex-wrap"
              id="pgdmTabs"
              role="tablist"
            >
              {[
                { id: "THE-PGDM-PROGRAMS", label: "THE PGDM PROGRAMS" },
                { id: "COURSE", label: "COURSE LOAD" },
                {
                  id: "ASSESSMENT-AND-FEEDBACK",
                  label: "ASSESSMENT AND FEEDBACK",
                },
                { id: "Term-Dates", label: "Term Dates" },
                { id: "Attendence", label: "Attendence" },
                { id: "MISSED-EVALUATIONS", label: "MISSED EVALUATIONS" },
                { id: "STUDENT", label: "STUDENT ACTIVITIES" },
                { id: "CAMPUS", label: "CAMPUS ADDRESS" },
              ].map((tab) => (
                <li className="nav-item" role="presentation" key={tab.id}>
                  <button
                    className={`tab-button ${
                      tab.id === "THE-PGDM-PROGRAMS" ? "active" : ""
                    }`}
                    id={`${tab.id}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tab.id}`}
                    type="button"
                    role="tab"
                    aria-controls={tab.id}
                    aria-selected={tab.id === "THE-PGDM-PROGRAMS"}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ==== TAB CONTENT ==== */}
          {pageData?.page_content && (
            <div
             
              dangerouslySetInnerHTML={{ __html: pageData.page_content }}
            />
          )}

          {/* ==== ACCORDIONS – STUDENT ACTIVITIES & LOGISTICS ==== */}
          <div className="container py-5 px-4">
            <h2
              className="s-heading text-center mb-4"
              style={{ color: "#08317a", fontWeight: 700 }}
            >
              STUDENT ACTIVITIES &amp; LOGISTICS
            </h2>
            <div className="row g-4">
              {/* LEFT COLUMN: Visa, Weather, Vaccination, Reaching, Residence, Currency, Settling, Housing, Food */}
              <div className="col-12 col-md-6">
                <div className="accordion" id="accordionLeft">
                  {/* VISA */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseVisa"
                        aria-expanded="false"
                        aria-controls="collapseVisa"
                      >
                        VISA
                      </button>
                    </h2>
                    <div
                      id="collapseVisa"
                      className="accordion-collapse collapse "
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          It is mandatory for all exchange students to come to
                          IMT Hyderabad on a student visa. IMT Hyderabad will
                          send a letter of admission as soon as the nominations
                          are received from the respective institute, and it
                          will be the responsibility of the incoming exchange
                          students to comply with any visa or other regulatory
                          requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* WEATHER */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWeather"
                        aria-expanded="false"
                        aria-controls="collapseWeather"
                      >
                        WEATHER
                      </button>
                    </h2>
                    <div
                      id="collapseWeather"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <ul className="mb-2">
                          <li>
                            <strong>June to October:</strong> It is the monsoon
                            season. Hyderabad receives 75% of its annual
                            rainfall during this period. Average temperature:
                            ~81°F; maximum: ~88°F.
                          </li>
                          <li>
                            <strong>November to February:</strong> Winter
                            season. Average temperature: ~60°F; can reach up to
                            83°F.
                          </li>
                        </ul>
                        <p>
                          Ensure you have appropriate clothing. Light cotton
                          clothes are ideal from June to October. Carry light
                          woolens for November through February.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* VACCINATION */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseVaccination"
                        aria-expanded="false"
                        aria-controls="collapseVaccination"
                      >
                        VACCINATION
                      </button>
                    </h2>
                    <div
                      id="collapseVaccination"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          Please consult with your local physician and ensure
                          you are adequately vaccinated before arriving in
                          India.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* REACHING IMT HYDERABAD */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseReach"
                        aria-expanded="false"
                        aria-controls="collapseReach"
                      >
                        REACHING IMT HYDERABAD
                      </button>
                    </h2>
                    <div
                      id="collapseReach"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          Hyderabad has an international airport — Rajiv Gandhi
                          International Airport — located near the IMT Hyderabad
                          campus. Pre-paid and regular taxis are available.
                          Alternatively, the International Relations Center
                          offers a free, one-time pick-up service — just send
                          your arrival details in advance to{" "}
                          <code>iro@imthyderabad.edu.in</code>.<br />
                          <br />
                          The campus is outside the city. A taxi from the city
                          center costs approximately ₹650–1000.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* RESIDENCE PERMIT */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseResidence"
                        aria-expanded="false"
                        aria-controls="collapseResidence"
                      >
                        RESIDENCE PERMIT
                      </button>
                    </h2>
                    <div
                      id="collapseResidence"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          All foreign students staying in India for 180 days or
                          more must register at the local Foreigners Regional
                          Registration Office (FRRO) within 14 days of arrival.
                          A penalty of USD 30 applies for late registration.
                          Registration is not required for stays under 180 days.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* CURRENCY EXCHANGE */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseCurrency"
                        aria-expanded="false"
                        aria-controls="collapseCurrency"
                      >
                        CURRENCY EXCHANGE
                      </button>
                    </h2>
                    <div
                      id="collapseCurrency"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          You can exchange USD, Euro, and other major currencies
                          at the airport (Weizmann Forex counter at
                          arrivals/departures) or in Shamshabad (UAE Exchange).
                          Most international ATMs have a weekly withdrawal limit
                          of INR 10,000. It’s advisable to carry ₹500–600
                          USD/Euro/GBP in cash upon arrival.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* SETTLING DOWN */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSettling"
                        aria-expanded="false"
                        aria-controls="collapseSettling"
                      >
                        SETTLING DOWN AT IMT HYDERABAD
                      </button>
                    </h2>
                    <div
                      id="collapseSettling"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          Housing and food are provided on campus. A compulsory
                          hospitality fee of INR 30,000 per term is payable via
                          online/wire transfer. Bank details will be shared.
                          Payment must be made within 15 days of arrival.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* HOUSING */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseHousing"
                        aria-expanded="false"
                        aria-controls="collapseHousing"
                      >
                        HOUSING
                      </button>
                    </h2>
                    <div
                      id="collapseHousing"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          All PGDM programs are fully residential. Separate
                          hostels for men and women. Rooms include a cot, table,
                          chair, cupboard, fan, and Wi-Fi. You must bring your
                          own pillows, mattress, and linen. Bathrooms and
                          toilets are shared by floor residents.
                          <br />
                          <br />
                          Carry mosquito repellents (liquid, coils, creams) —
                          easily available locally.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* FOOD */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFood"
                        aria-expanded="false"
                        aria-controls="collapseFood"
                      >
                        FOOD
                      </button>
                    </h2>
                    <div
                      id="collapseFood"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionLeft"
                    >
                      <div className="accordion-body">
                        <p>
                          A common dining hall serves vegetarian and
                          non-vegetarian meals (3x/week) four times daily. Food
                          is a blend of North and South Indian cuisines — often
                          spicy. A cafeteria is open 9am–11pm, serving tea,
                          coffee, snacks, and beverages (payable). Meals in the
                          dining hall are free. Several international
                          restaurants are available in the city.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* RIGHT COLUMN: Computer Labs, Water, Library, Other Facilities, Groceries, Textbooks, Banks, Insurance, Medical */}
              <div className="col-12 col-md-6">
                <div className="accordion" id="accordionRight">
                  {/* COMPUTER LABS */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseComputerLabs"
                        aria-expanded="false"
                        aria-controls="collapseComputerLabs"
                      >
                        COMPUTER LABS
                      </button>
                    </h2>
                    <div
                      id="collapseComputerLabs"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          The Computational Resource Centre (CRC) is equipped
                          with state-of-the-art computers and software. The
                          institute has a dedicated 50 MBPS internet connection.
                          Access is available 24/7. CRC is open Monday–Saturday,
                          9:30 AM – 8:30 PM.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* DRINKING WATER */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWater"
                        aria-expanded="false"
                        aria-controls="collapseWater"
                      >
                        DRINKING WATER
                      </button>
                    </h2>
                    <div
                      id="collapseWater"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          Use bottled water during your first few days. Campus
                          water dispensers provide filtered potable water, but
                          it may take time to adjust. Reliable brands: Bisleri,
                          Bailey, Aqua Fina, Kinley.
                          <br />
                          <br />
                          <strong>Note:</strong> Tap water in bathrooms is NOT
                          potable.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* LIBRARY */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseLibrary"
                        aria-expanded="false"
                        aria-controls="collapseLibrary"
                      >
                        LIBRARY
                      </button>
                    </h2>
                    <div
                      id="collapseLibrary"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          The Learning Resource Centre (LRC) has 12,159+ books
                          (7,310+ titles), 47 national journals, 10
                          international journals, 21 business magazines, and 8
                          newspapers. Subscriptions include EBSCO, ABI, Emerald,
                          Capitaline, EMIS, and Harvard Business Cases. Open
                          Monday–Friday, 9:30 AM – 8:30 PM.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* OTHER FACILITIES */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFacilities"
                        aria-expanded="false"
                        aria-controls="collapseFacilities"
                      >
                        OTHER FACILITIES ON CAMPUS
                      </button>
                    </h2>
                    <div
                      id="collapseFacilities"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          Photocopying and printing (nominal charge)
                          <br />
                          Courier and mail services
                          <br />
                          Gym (treadmills, cycling, weightlifting)
                          <br />
                          Sports: Basketball, Table Tennis, Cricket, Football,
                          Tennis
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* FRUITS / VEGETABLES */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseGroceries"
                        aria-expanded="false"
                        aria-controls="collapseGroceries"
                      >
                        FRUITS / VEGETABLES AND GENERAL SUPPLIES
                      </button>
                    </h2>
                    <div
                      id="collapseGroceries"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          Fresh fruits, vegetables, and groceries are available
                          in Shamshabad — the nearest market. Students and the
                          International Relations Office are happy to help you
                          locate stores and specialty items.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* TEXTBOOKS */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTextbooks"
                        aria-expanded="false"
                        aria-controls="collapseTextbooks"
                      >
                        TEXTBOOKS
                      </button>
                    </h2>
                    <div
                      id="collapseTextbooks"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          All textbooks and course materials are provided by IMT
                          Hyderabad at no extra cost.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* BANKS & CURRENCY */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseBanks"
                        aria-expanded="false"
                        aria-controls="collapseBanks"
                      >
                        BANKS AND CURRENCY EXCHANGE
                      </button>
                    </h2>
                    <div
                      id="collapseBanks"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          An ATM is available on campus for emergencies. Several
                          state and private banks have branches in Shamshabad.
                          Most international ATMs cap withdrawals at INR 10,000
                          per transaction. Carry ₹200–300 USD/Euro/GBP in cash
                          on arrival.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* MEDICAL INSURANCE */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseInsurance"
                        aria-expanded="false"
                        aria-controls="collapseInsurance"
                      >
                        MEDICAL INSURANCE
                      </button>
                    </h2>
                    <div
                      id="collapseInsurance"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          It is strongly recommended that all exchange students
                          have health insurance. This ensures cashless treatment
                          in case of illness or accident. While not mandatory,
                          having coverage is essential for peace of mind.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* MEDICAL FACILITIES */}
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button bg-warning text-dark fw-bold shadow-sm"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseMedical"
                        aria-expanded="false"
                        aria-controls="collapseMedical"
                      >
                        MEDICAL FACILITIES ON CAMPUS
                      </button>
                    </h2>
                    <div
                      id="collapseMedical"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionRight"
                    >
                      <div className="accordion-body">
                        <p>
                          The campus has a medical center. A doctor is available
                          Monday–Friday: 7:00–8:30 AM and 5:00–6:30 PM. On
                          weekends: 8:00–9:30 AM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ALL ORIGINAL STYLES (preserved 1:1) ===== */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
      body {
        background-color: #f5f7fa;
        color: #333;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      .container {
        max-width: 1200px;
      }

      .tabs-container {
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
      }

      .tab-button {
        border: none;
        border-radius: 50px;
        padding: 12px 28px;
        margin: 0 8px 12px;
        background: #e0e0e0;
        color: #000;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      }

      .tab-button:hover {
        background: #d0d0d0;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }

      .tab-button.active {
        background: #FFC107;
        color: #000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .tab-content {
        background: white;
        border-radius: 12px;
        padding: 2.5rem;
        box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        border: 1px solid #eee;
      }

      .faculty-hero {
        background: url('/media/hero.webp');
        position: relative;
        background-size: cover;
        height: 50vh;
      }
      .faculty-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.3);
      }
      .faculty-hero h2,
      .faculty-hero p {
        position: relative;
        z-index: 1;
      }
      .faculty-hero h2 {
        margin-top: 150px;
      }

      .faculty-card {
        background: #f8f9fa;
        border: none;
        border-radius: 1.5rem;
      }

      .faculty-img {
        border-radius: 1.2rem;
        transition: transform 0.4s ease;
      }
      .faculty-img:hover {
        transform: scale(1.03);
      }

      .social-icon {
        display: inline-flex;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        background: #ffc107;
        color: #fff;
        transition: all 0.3s;
      }
      .social-icon:hover {
        background: #5390D9;
        color: #fff;
        transform: translateY(-3px);
      }

      .faculty-tabs .nav-pills .nav-link.active {
        background: #ffc107 !important;
        color: #000 !important;
      }

      .small-placeholder::placeholder {
        font-size: 0.85rem;
      }

      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link {
        border-radius: 50rem !important;
        background: #ffc107 !important;
        color: #333 !important;
        transition: all 0.3s !important;
      }

      .nav-pills .nav-link {
        border-radius: var(--bs-nav-pills-border-radius);
        background: #e9ecef;
        border-radius: 30px;
        color: #333;
      }
    `,
          }}
        />
      </section>
    </>
  );
}
