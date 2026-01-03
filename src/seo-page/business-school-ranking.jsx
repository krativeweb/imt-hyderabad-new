"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function Rankings() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) return;

    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/mandatory/slug/rankings`);
        const json = await res.json();
        setPageData(json);
      } catch (err) {
        console.error("Failed to fetch rankings page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [API_URL]);

  if (loading || !pageData) return null;

  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <section className="faculty-section">
        <div
          className="faculty-hero text-center text-white py-5"
          style={{
            background: `url(${API_URL}${pageData.banner_image})`,
            position: "relative",
            backgroundSize: "cover",
            height: "60vh",
            backgroundPosition: "center",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(pageData.banner_text),
            }}
          />
        </div>

        {/* ================= BREADCRUMB ================= */}
        <div
          className="breadcrumb p-4"
          style={{ backgroundColor: "rgb(22 57 119)" }}
        >
          <div className="container-fluid">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent p-0 m-0">
                <li className="breadcrumb-item">
                  <Link
                    href="/"
                    className="text-white fw-bold"
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active text-warning fw-bold"
                  aria-current="page"
                >
                  {pageData.page_title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* ================= PAGE CONTENT ================= */}
      <section id="rankings" className="py-5">
        <div className="container">
          <h2
            className="section-title text-center mb-4"
            style={{ color: "#08317a" }}
          >
            {pageData.page_title}
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(pageData.page_content),
            }}
          />
        </div>
      </section>

      {/* ================= LOGOS SECTION (FROM DB) ================= */}
      {pageData.gallery_images?.length > 0 && (
        <section className="py-5" style={{ backgroundColor: "#151f54" }}>
          <div className="container">
            <div className="row logos_section_inner justify-content-center g-4">
              {pageData.gallery_images.map((img, i) => (
                <div key={i} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="ranking-logo-card text-center">
                    <div className="logo-container">
                      <img
                        src={`${API_URL}${img}`}
                        alt={`Ranking Logo ${i + 1}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === ORIGINAL CSS (No Truncation) === */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
      .faculty-hero {
        background: url("./media/hero.webp");
        position: relative;
        background-size: cover;
        height: 50vh;
          background-position: center !important;
      }
      .faculty-hero::before {
        content: "";
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
        color: #ffffffff;
        transition: all 0.3s;
      }
      .social-icon:hover {
        background: #5390d9;
        color: #ffffffff;
        transform: translateY(-3px);
      }

      .faculty-tabs .nav-pills .nav-link {
        border-radius: 50rem;
        background: #e9ecef;
        color: #333;
        transition: all 0.3s;
      }
      .faculty-tabs .nav-pills .nav-link.active {
        background: #ffc107;
        color: #000000ff;
      }

      body {
        color: #333;
        line-height: 1.6;
      }

      .section-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--imt-primary);
        margin-bottom: 1.5rem;
        position: relative;
        padding-bottom: 0.5rem;
      }

      .section-title::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: var(--imt-secondary);
      }

      .rankings-card {
        background: #fff;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.08);
        padding: 1.75rem;
        margin-bottom: 2rem;
        border: 1px solid #e9ecef;
      }

      .ranking-header {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--imt-primary);
        margin: 1.5rem 0 0.75rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #eee;
      }

      .ranking-list li {
        padding: 0.5rem 0;
        font-size: 0.95rem;
      }

      .institution-rank {
        font-weight: 700;
        color: var(--imt-secondary);
        min-width: 40px;
        display: inline-block;
      }

      .section-bg {
        background-color: #151f54;
        padding: 3rem 0;
        border-radius: 15px;
        margin: 2rem 0;
      }

      .ranking-logo-card {
        background: white;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 1.5rem;
        transition: all 0.3s ease;
        height: 100%;
      }

      .logo-container {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        max-width: 200px;
      }

      .logo-container img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        filter: brightness(0.9);
        transition: all 0.3s ease;
      }

      @media (max-width: 768px) {
        .logo-container {
          height: 100px;
        }
        .section-title {
          font-size: 1.5rem;
        }
      }

      @media (max-width: 576px) {
        .logo-container {
          height: 80px;
          max-width: 150px;
        }
        .section-title {
          font-size: 1.3rem;
        }
      }

      @media (max-width: 768px) {
        .section-title {
          font-size: 1.7rem;
        }
        .ranking-header {
          font-size: 1.2rem;
        }
        .ranking-list li {
          font-size: 0.9rem;
        }
      }

      @media (max-width: 576px) {
        .section-title {
          font-size: 1.5rem;
        }
      }
    `,
        }}
      />
    </>
  );
}
