"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Loader from "@/components/Loader";

/* =====================================================
   EMBLA SLIDER (NO refs exposed, CSS untouched)
===================================================== */
function EmblaRow({ data, onSelect, activeItem }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    skipSnaps: false,
    duration: 12, // 🔥 FAST SNAP
  });

  return (
    <div className="cards-slider">
      <div className="cards-row" ref={emblaRef}>
        {Object.entries(data).map(([key, item]) => (
          <div className="card-wrapper" key={key}>
            <div
              className={`image-card ${
                activeItem?.title === item.title ? "active" : ""
              }`}
              onClick={() => onSelect(item)}
            >
              <img src={item.img} alt={item.title} />
              <div className="card-overlay">
                <h5>{item.title.split(" – ")[0]}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button
          className="nav-btn prev-btn"
          onClick={() => emblaApi?.scrollPrev(true)}
        >
          &lt;
        </button>
        <button
          className="nav-btn next-btn"
          onClick={() => emblaApi?.scrollNext(true)}
        >
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

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/club-communities-seo`
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

  /* =====================================================
     ⛔ PASTE YOUR clubData EXACTLY AS-IS BELOW
  ===================================================== */
  const clubData = {
    1: {
      title: "ALTIUS – THE SPORTS CLUB OF IMT-HYDERABAD",
      content: `<p><strong>Team Altius</strong> aims at bringing together people from different cultures and mindsets with the spirit of Sportsmanship. Altius has always tried to play a role in establishing a proper work-life balance in studies and sports which refreshes the minds of students, to continue the zeal for sports and to raise a bar in the years to come.</p>
         <h6>Flagship Events</h6>
         <ul>
           <li>IMT Hyderabad League (IHL) – Cricket, Football, Basketball, Volleyball, Table Tennis, Mini Marathon</li>
         </ul>`,
      img: "/media/clubs&committes/1club.png",

      links: [
        {
          icon: "fab fa-instagram",
          url: "https://www.instagram.com/altius_imthyd/",
        },
        {
          icon: "fab fa-facebook",
          url: "https://www.facebook.com/AltiusIMTH/",
        },
      ],
      mentor: { img: "./media/clubs&committes/data/Altius/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Altius/1.webp" },
        { img: "./media/clubs&committes/data/Altius/2.webp" },
        { img: "./media/clubs&committes/data/Altius/3.webp" },
        { img: "./media/clubs&committes/data/Altius/4.webp" },
        { img: "./media/clubs&committes/data/Altius/5.webp" },
        { img: "./media/clubs&committes/data/Altius/6.webp" },
        { img: "./media/clubs&committes/data/Altius/7.webp" },
      ],
    },
    2: {
      title: "Communication Wing",
      content: `<p>The <strong>Communication Wing</strong> is an amalgamation of the different skills that are needed to enhance one's communication. From writing to public speaking, we ensure that there is a fun aspect to effective interaction, as well as to eliminate the fear that people hold when it comes to communicating thoughts and ideas publically.</p>
         <h6>Objective</h6>
         <p>To build and improve effective communication and social skills & enhance the productivity and creative abilities of fellow IMT-ians by means of various innovative events, platforms, and exposure.</p>
         <h6>What do we intend to achieve?</h6>
         <ul>
           <li>Peer interaction and development through opportunities like Open Mic Nights, Mock GDs, Debates, etc.</li>
           <li>Higher visibility for IMT-H by integrating platforms like Toastmasters, Terribly Tiny Tales</li>
           <li>Creating a unique identity via Humans of IMT Hyderabad initiative</li>
           <li>Accessible communication development through social media campaigns (#WordoftheDay, Idiom of the week, book reviews, book barters)</li>
         </ul>
         <h6>Events</h6>
         <ul><li>Open Mic Nights</li><li>Big Fight: Debate</li><li>Pantomath</li><li>League of Nations</li></ul>
         <h6>Initiatives in the pipeline</h6>
         <ul><li>Toastmasters</li><li>TTT: Terribly Tiny Tales</li></ul>`,
      img: "/media/clubs&committes/2club.png",
      links: [
        {
          icon: "fab fa-instagram",
          url: "https://www.instagram.com/communication_wing/",
        },
        {
          icon: "fab fa-linkedin",
          url: "https://www.linkedin.com/company/communication-wing-imth/",
        },
      ],
      mentor: { img: "./media/clubs&committes/data/CommWing/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/CommWing/1.webp" },
        { img: "./media/clubs&committes/data/CommWing/2.webp" },
        { img: "./media/clubs&committes/data/CommWing/3.webp" },
        { img: "./media/clubs&committes/data/CommWing/1.webp" },
        { img: "./media/clubs&committes/data/CommWing/5.webp" },
        { img: "./media/clubs&committes/data/CommWing/6.webp" },
        { img: "./media/clubs&committes/data/CommWing/7.webp" },
      ],
    },
    3: {
      title: "Antragna",
      content: `<p>A PGDM programme doesn't stop at the classroom, especially when the Campus is as diverse as ours. Antragna - the cultural club of IMT Hyderabad is all about bringing out the latent cultural expression inside every student. Apart from celebrating major festivals, Antragna's objective is to promote cultural creativity across performing and visual arts. We facilitate festival celebrations, stage productions, street plays and other cultural showcases.</p>
         <h6>Objectives</h6>
         <p>To develop the spirit and attitude among students to explore experiential and innovative ways of learning the new-age business intricacies & strategies through culture and performance.</p>`,
      img: "/media/clubs&committes/3club.png",
      links: [],
      mentor: { img: "./media/clubs&committes/data/Antragna/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Antragna/1.webp" },
        { img: "./media/clubs&committes/data/Antragna/2.webp" },
        { img: "./media/clubs&committes/data/Antragna/3.webp" },
        { img: "./media/clubs&committes/data/Antragna/4.webp" },
        { img: "./media/clubs&committes/data/Antragna/5.webp" },
        { img: "./media/clubs&committes/data/Antragna/6.webp" },
        { img: "./media/clubs&committes/data/Antragna/7.webp" },
      ],
    },
    4: {
      title: "Athena",
      content: `<p><strong>Athena</strong> is a student-driven club that provides a platform for exploring strategy and business thinking. It collaborates with corporates to bring live projects, bridging academics and industry expectations.</p>
         <h6>Events & Initiatives</h6>
         <ul>
           <li><strong>Crazzino</strong> - Athena’s flagship event testing decision making.</li>
           <li><strong>IHL Fantasy League</strong> - cricket based analytical game run alongside IHL.</li>
           <li><strong>Be-Trust</strong> - trust and understanding game.</li>
           <li><strong>Chakravyuh</strong> - major Implez event focused on strategy and ROI.</li>
           <li><strong>Ace The Space</strong> - minor event testing knowledge and quick thinking.</li>
         </ul>
         <h6>Initiatives</h6>
         <ul>
           <li>Live projects & case solving with Kraftshala</li>
           <li>Wall Magazine - curated strategic news/items for campus</li>
           <li>#WhatsTheirStrategy - online series featuring strategy content</li>
         </ul>
         <h6>Meet The Team</h6>
         <p>Top Row (L-R): Siddharth K, Anubhav Jaiswal, Shalini Shaw, Harshil Patel, Vijeth S, Pranay Jain</p>
         <p>Middle Row (L-R): Anush Kumar, Lavish Jain</p>
         <p>Lowest Row (L-R): Akshita Agarwal, Harsh Dhoot, Sakshi Mundhra, Sowmya Alur, Yash Shrivastava</p>
         <p><strong>Co-ordinators:</strong> Pranay Jain & Sowmya Alur</p>`,
      img: "/media/clubs&committes/4club.png",
      links: [],
      mentor: { img: "./media/clubs&committes/data/Athena/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Athena/1.webp" },
        { img: "./media/clubs&committes/data/Athena/2.webp" },
        { img: "./media/clubs&committes/data/Athena/3.webp" },
        { img: "./media/clubs&committes/data/Athena/4.webp" },
        { img: "./media/clubs&committes/data/Athena/5.webp" },
        { img: "./media/clubs&committes/data/Athena/6.webp" },
        { img: "./media/clubs&committes/data/Athena/7.webp" },
      ],
    },
    5: {
      title: "Mercatus Mantra",
      content: `<p><strong>Objective:</strong> To bring people together and explore marketing aspects that make one industry-fit, using unique and engaging initiatives.</p>
         <p><strong>About the Club:</strong> Mercatus Mantra applies marketing concepts to practical events and runs year-round initiatives to teach branding, pricing, positioning, and marketing strategy.</p>
         <h6>What we intend to achieve</h6>
         <ul>
           <li>Opportunities for students to participate in and organise marketing-centric events</li>
           <li>Higher visibility for IMT-H through inter-college participation</li>
           <li>Keep students updated on marketing trends via campaigns and an annual magazine</li>
         </ul>
         <h6>Flagship Event: Buzzaar</h6>
         <p>An experiential marketplace where participants sell products applying branding, pricing and communication strategies.</p>
         <h6>Other Events & Initiatives</h6>
         <ul>
           <li>Market Surveys</li>
           <li>Brandathon</li>
           <li>Brandify</li>
           <li>AdTract</li>
           <li>The Riddler’s Anarchy</li>
           <li>Mercazine (Annual Marketing Magazine)</li>
         </ul>`,
      img: "/media/clubs&committes/5club.png",
      links: [],
      mentor: { img: "./media/clubs&committes/data/Mercatus/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Mercatus/1.webp" },
        { img: "./media/clubs&committes/data/Mercatus/2.webp" },
        { img: "./media/clubs&committes/data/Mercatus/3.webp" },
        { img: "./media/clubs&committes/data/Mercatus/4.webp" },
        { img: "./media/clubs&committes/data/Mercatus/5.webp" },
        { img: "./media/clubs&committes/data/Mercatus/6.webp" },
        { img: "./media/clubs&committes/data/Mercatus/7.webp" },
      ],
    },
    6: {
      title: "Opuskriya",
      content: `<p>Opuskriya is the Operations Club of IMT-Hyderabad. Its objective is to provide a platform for interaction between students and industry leaders in Operations Management. The club organises operations-based case study events and business simulations.</p>
         <h6>Flagship & Major Events</h6>
         <ul>
           <li><strong>Chain E Maniac</strong> – time-based simulation testing operational decision-making.</li>
           <li><strong>Episteme</strong> – major case-study event during IMPELZ testing analytical skills.</li>
           <li><strong>Joker’s Conviction</strong> – minor event assessing adaptive strategy-making skills.</li>
         </ul>
         <h6>Certification & Courses</h6>
         <ul>
           <li>Six Sigma Green Belt Certification (in association with KPMG)</li>
           <li>SCM EXE Certification (in association with CII)</li>
         </ul>`,
      img: "/media/clubs&committes/6club.jpg",
      links: [
        {
          icon: "fab fa-facebook",
          url: "https://www.facebook.com/OpuskriyaIMT/",
        },
      ],
      mentor: { img: "./media/clubs&committes/data/Opuskriya/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Opuskriya/6.webp" },
        { img: "./media/clubs&committes/data/Opuskriya/2.webp" },
        { img: "./media/clubs&committes/data/Opuskriya/5.webp" },
        { img: "./media/clubs&committes/data/Opuskriya/4.webp" },
        { img: "./media/clubs&committes/data/Opuskriya/1.webp" },
        { img: "./media/clubs&committes/data/Opuskriya/3.webp" },
        { img: "./media/clubs&committes/data/Opuskriya/7.webp" },
      ],
    },
    7: {
      title: "Prarambh",
      content: `<p>Prarambh (E-Cell) promotes entrepreneurial spirit via events that foster innovation and startup skills.</p>
         <h6>Events</h6>
         <ul>
           <li><strong>Food Fiesta</strong> – annual food festival with student-run stalls</li>
           <li><strong>Pitch Up</strong> – B-Plan competition and startup podium</li>
           <li><strong>Ortus</strong> – storytelling platform with entrepreneur talks</li>
           <li><strong>TiE GRAD</strong> – entrepreneurial workshops in association with TiE</li>
         </ul>`,
      img: "/media/clubs&committes/7club.jpg",
      links: [
        {
          icon: "fab fa-instagram",
          url: "https://www.instagram.com/ecell_imthyderabad/",
        },
        {
          icon: "fas fa-envelope",
          url: "mailto:prarambh.ecell@imthyderabad.edu.in",
        },
        {
          icon: "fab fa-facebook",
          url: "https://www.facebook.com/ecell.imthyd/",
        },
      ],
      mentor: { img: "./media/clubs&committes/data/Prarambh/1.webp" },
      students: [
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
        { img: "./media/clubs&committes/data/Prarambh/all.webp" },
      ],
    },
    8: {
      title: "Tassavur",
      content: `<p><strong>Objective:</strong> Tassavur (Imagination) was formed in 2018 to give a platform for creative expression — art, photography, filmmaking, poetry and more.</p>
         <h6>How we work</h6>
         <p>We create a warm environment through events that channel ideas into tangible creative outcomes.</p>
         <h6>Events & Activities</h6>
         <ul>
           <li>Friendship Day</li>
           <li>Who Did It Better (online poll for creativity)</li>
           <li>Live sketching</li>
           <li>Calligraphy Workshop</li>
           <li>Photo Walk</li>
           <li>Independence Day T-shirt design</li>
           <li>Photography Workshop</li>
           <li>Riveria (painting event)</li>
           <li>Face-Off (face painting)</li>
           <li>Nazaria (single-light photography)</li>
           <li>Product Design Workshop (with Kilkaari & Co.)</li>
         </ul>`,
      img: "/media/clubs&committes/8club.png",
      links: [
        {
          icon: "fab fa-instagram",
          url: "https://www.instagram.com/tassavurimthyd/",
        },
        {
          icon: "fab fa-facebook",
          url: "https://www.facebook.com/TassavurIMTHyd/",
        },
      ],
      mentor: { img: "./media/clubs&committes/data/Tassavur/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Tassavur/1.webp" },
        { img: "./media/clubs&committes/data/Tassavur/2.webp" },
        { img: "./media/clubs&committes/data/Tassavur/3.webp" },
        { img: "./media/clubs&committes/data/Tassavur/4.webp" },
        { img: "./media/clubs&committes/data/Tassavur/5.webp" },
        { img: "./media/clubs&committes/data/Tassavur/2.webp" },
        { img: "./media/clubs&committes/data/Tassavur/4.webp" },
      ],
    },
  };

  const committeeData = {
    1: {
      title: "Media Relations Committee",
      content: `<p>The Media Relations Committee (MRC) is responsible for communicating campus news externally. Known as the "face of IMT-H", MRC publishes content and coordinates campus activities via six teams.</p>
         <h6>The 6 cohorts & roles</h6>
         <ul>
           <li><strong>Admissions:</strong> Helps prospective students, answers queries and boosts awareness.</li>
           <li><strong>Blog:</strong> Writes creative and concise articles about campus events.</li>
           <li><strong>Social Media:</strong> Runs official social accounts and live updates during flagship events.</li>
           <li><strong>Design:</strong> Creates posters and newsletter layouts.</li>
           <li><strong>Photography:</strong> Captures key campus moments in events.</li>
           <li><strong>Press Release:</strong> Shares stories and interviews with media outlets.</li>
         </ul>`,
      img: "/media/clubs&committes/1comm.jpeg",
      mentor: { img: "./media/clubs&committes/data/MRC/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/MRC/1.webp" },
        { img: "./media/clubs&committes/data/MRC/2.webp" },
        { img: "./media/clubs&committes/data/MRC/3.webp" },
        { img: "./media/clubs&committes/data/MRC/4.webp" },
        { img: "./media/clubs&committes/data/MRC/5.webp" },
        { img: "./media/clubs&committes/data/MRC/6.webp" },
        { img: "./media/clubs&committes/data/MRC/7.webp" },
      ],
    },
    2: {
      title: "Mezzo",
      content: `<p>Mezzo ensures nutritious food and a well-managed dining experience at IMT-H.</p>
         <h6>Mess</h6>
         <p>Mezzo manages meal quality (two members taste each meal daily), conducts inventory audits, and ensures hygiene. The mess staffing includes cooks, employees and supervisors; Mezzo acts as intermediary between students and kitchen staff.</p>
         <h6>Inventory & Infrastructure</h6>
         <p>Mezzo maintains dining halls (capacity ~300), executive dining, and infrastructure.</p>
         <h6>Cafeteria (Adda)</h6>
         <p>Mezzo liaises with Adda staff, recommends menu items, and performs inventory checks to maintain hygiene and stock updates.</p>`,
      img: "/media/clubs&committes/2comm.png",
      mentor: { img: "./media/clubs&committes/data/MEZZO/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/MEZZO/1.webp" },
        { img: "./media/clubs&committes/data/MEZZO/2.webp" },
        { img: "./media/clubs&committes/data/MEZZO/3.webp" },
        { img: "./media/clubs&committes/data/MEZZO/4.webp" },
        { img: "./media/clubs&committes/data/MEZZO/5.webp" },
        { img: "./media/clubs&committes/data/MEZZO/6.webp" },
        { img: "./media/clubs&committes/data/MEZZO/7.webp" },
      ],
    },
    3: {
      title: "TEDx",
      content: `<p><strong>Objective:</strong> To spread ideas via short powerful talks across Technology, Entertainment and Design.</p>
         <p>The organising committee plans yearly themes, contacts speakers, manages promotions, sponsorships and budgeting. Volunteers help with social media, logistics and event delivery.</p>
         <p>We follow TED's mission: "Ideas worth spreading" — bringing diverse perspectives to the local community.</p>
         <p><strong>Website:</strong> <a href="https://www.tedximthyderabad.com/" target="_blank">https://www.tedximthyderabad.com/</a></p>`,
      img: "/media/clubs&committes/3comm.png",
      mentor: { img: "./media/clubs&committes/data/Tedx/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/Tedx/1.webp" },
        { img: "./media/clubs&committes/data/Tedx/2.webp" },
        { img: "./media/clubs&committes/data/Tedx/3.webp" },
        { img: "./media/clubs&committes/data/Tedx/4.webp" },
        { img: "./media/clubs&committes/data/Tedx/3.webp" },
        { img: "./media/clubs&committes/data/Tedx/2.webp" },
        { img: "./media/clubs&committes/data/Tedx/1.webp" },
      ],
    },
    4: {
      title: "Alumni Relations Committee",
      content: `<p>The Alumni Relations Committee (ARC) builds a bridge between alumni and IMT Hyderabad, collaborating with other IMT campuses for unity and alumni engagement.</p>
         <h6>Key Initiatives</h6>
         <ul>
           <li><strong>Alumni Walk the Talk:</strong> Web series where alumni share transition stories.</li>
           <li><strong>Campus Drive series:</strong> Connects alumni recruiters' insights with campus life.</li>
           <li><strong>Workshops:</strong> Photography workshops and seminars by alumni.</li>
           <li><strong>Mentorship Program:</strong> One-on-one guidance by alumni experts.</li>
           <li><strong>CV Screening:</strong> Resume screening before placements.</li>
           <li><strong>Chapter Meets:</strong> City chapter meets across cities for alumni networking.</li>
         </ul>`,
      img: "/media/clubs&committes/4comm.png",
      mentor: { img: "./media/clubs&committes/data/ARC/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/ARC/1.webp" },
        { img: "./media/clubs&committes/data/ARC/2.webp" },
        { img: "./media/clubs&committes/data/ARC/3.webp" },
        { img: "./media/clubs&committes/data/ARC/4.webp" },
        { img: "./media/clubs&committes/data/ARC/5.webp" },
        { img: "./media/clubs&committes/data/ARC/6.webp" },
        { img: "./media/clubs&committes/data/ARC/7.webp" },
      ],
    },
    5: {
      title: "International Relations (IRC)",
      content: `<p><strong>Purpose:</strong> To establish IMT Hyderabad on the global stage by handling inbound/outbound student exchanges and short-term exchange programs (STEP).</p>
         <p>This committee connects IMT-H with partner institutions worldwide and supports exchange logistics and student coordination.</p>`,
      img: "/media/clubs&committes/5comm.png",
      mentor: { img: "./media/clubs&committes/data/IRC/all.webp" },
      students: [
        { img: "./media/clubs&committes/data/IRC/1.webp" },
        { img: "./media/clubs&committes/data/IRC/2.webp" },
        { img: "./media/clubs&committes/data/IRC/3.webp" },
        { img: "./media/clubs&committes/data/IRC/4.webp" },
        { img: "./media/clubs&committes/data/IRC/5.webp" },
        { img: "./media/clubs&committes/data/IRC/6.webp" },
        { img: "./media/clubs&committes/data/IRC/7.webp" },
      ],
    },
    6: {
      title: "Student Council",
      content: `<p>The Student Council ensures student welfare, maintains discipline, and acts as a communication bridge between students and management to resolve grievances.</p>
         <h6>Objectives</h6>
         <ul>
           <li>Ensure well-being and discipline of student fraternity</li>
           <li>Implement changes that deliver long-term student benefits</li>
           <li>Bridge communication between students and management for grievance resolution</li>
         </ul>`,
      img: "/media/clubs&committes/6comm.jpg",
      mentor: { img: "./media/clubs&committes/data/Student/1.webp" },
      students: [
        { img: "./media/c.webp" },
        { img: "./media/c.webp" },
        { img: "./media/c.webp" },
        { img: "./media/c.webp" },
        { img: "./media/c.webp" },
        { img: "./media/c.webp" },
        { img: "./media/c.webp" },
      ],
    },
  };

  const [activeClub, setActiveClub] = useState(Object.values(clubData)[0]);
  const [activeCommittee, setActiveCommittee] = useState(
    Object.values(committeeData)[0]
  );

  if (loading) return <Loader />;

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
                  <h4 className="card-title text-center">{activeClub.title}</h4>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: activeClub.content,
                    }}
                  />

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
        <div className="container-fluid">
          <h2 className="text-center fw-bold mb-4 text-warning">Events</h2>

          <div className="row g-4 px-4">
            {["1.webp", "2.webp", "3.webp", "4.webp"].map((img, i) => (
              <div className="col-md-3 col-sm-6" key={i}>
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
            <EmblaRow data={committeeData} onSelect={setActiveCommittee} />
          </div>

          {activeCommittee && (
            <div className="container mt-4">
              <div
                className="card detail-card"
                style={{ color: "#08317a", display: "block" }}
              >
                <div className="card-body">
                  <h4 className="card-title text-center">
                    {activeCommittee.title}
                  </h4>

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
      /* Faculty Hero */
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

      /* Member Card Styles */
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
      // .member-info {
      //   background: #08317a;
      //   color: #fff;
      //   text-align: center;
      //   padding: 10px 5px;
      // }
      // .member-info h5 {
      //   margin: 0;
      //   font-size: 1rem;
      //   font-weight: 600;
      // }
      // .member-info p {
      //   margin: 0;
      //   font-size: 0.8rem;
      //   opacity: 0.8;
      // }
      .member-card .member-info  {
  display: none !important;
}

      .mentor-wrapper {
        max-width: 300px;
        width: 100%;
      }
      // .batch-badge {
      //   position: absolute;
      //   top: 10px;
      //   right: 10px;
      //   background: #ffc107;
      //   color: #000;
      //   padding: 3px 10px;
      //   border-radius: 20px;
      //   font-size: 0.75rem;
      //   font-weight: bold;
      //   z-index: 2;
      //   box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      // }

      .student-slider-container {
        position: relative;
        padding: 0 50px;
      }
      .student-track-window {
        overflow: hidden;
        width: 100%;
      }
        .cards-row {
  display: flex;
  transition: transform 0.5s ease;  /* ❌ THIS OVERRIDES EMBLA */
  gap: 15px;
}
      .student-track {
        display: flex;
        transition: transform 0.5s ease-in-out;
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
      .student-nav.prev-btn {
        left: 0;
      }
      .student-nav.next-btn {
        right: 0;
      }
      .student-nav:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Image Card */
      .image-card {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        height: 160px;
      }
      .image-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      }
      .image-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .image-card.active {
        border-bottom: 12px double #ffc107;
        transition: all 0.3s ease-in-out;
        background-color: #163977;
      }
      .card-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 12px;
        border-radius: 0 0 12px 12px;
      }
      .card-overlay h5 {
        margin: 0;
        font-size: 0.85rem;
      }

      /* Slider Container */
      .slider-container {
        position: relative;
        margin-top: 30px;
        user-select: none;
      }
      .cards-slider {
        overflow: hidden;
        width: 100%;
        padding: 0 15px;
      }
  
      .card-wrapper {
        flex-shrink: 0;
      }

      /* Bottom Controls */
      .slider-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-top: 20px;
      }
      .nav-btn {
        background: #ffc107;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background 0.3s;
      }
      .nav-btn:hover {
        background: #0056b3;
      }
      .nav-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      .dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ccc;
        cursor: pointer;
        transition: background 0.3s;
      }
      .dot.active {
        background: #ffc107;
        width: 25px;
        border-radius: 5px;
      }


      /* Responsive for Sliders */
      @media (min-width: 992px) {
        .clubs .card-wrapper {
          width: calc((100% - 105px) / 8);
        }
        .committees .card-wrapper {
          width: calc((100% - 75px) / 6);
        }
        .image-card {
          height: 150px;
        }
        .slider-controls {
          display: none !important;
        }
        .cards-slider {
          padding: 0;
        }
      }
      @media (min-width: 768px) and (max-width: 991.98px) {
        .card-wrapper {
          width: calc((100% - 30px) / 3);
        }
        .image-card {
          height: 140px;
        }
      }
      @media (max-width: 767.98px) {
        .card-wrapper {
          width: calc((100% - 15px) / 2);
        }
        .image-card {
          height: 130px;
        }
        .cards-slider {
          padding: 0 10px;
        }
      }

      /* Video Carousel Section */
      .video-carousel-section {
        background: #163977;
      }
      .image-wrapper img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .image-wrapper img:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      }
      .owl-nav button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
      }
      .owl-nav button:hover {
        background: rgba(0,0,0,0.8);
      }
      @media (max-width: 768px) {
        .image-wrapper img {
          border-radius: 5px;
        }
      }
      .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
      .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
      }
      .video-wrapper iframe:hover {
        transform: scale(1.03);
      }
      .owl-carousel .owl-nav button.owl-prev,
      .owl-carousel .owl-nav button.owl-next {
        position: absolute;
        top: 40%;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: 50%;
      }
      .owl-carousel .owl-nav button.owl-prev {
        left: -25px;
      }
      .owl-carousel .owl-nav button.owl-next {
        right: -25px;
      }
      .owl-theme .owl-dots .owl-dot {
        display: inline-block;
        zoom: 1;
      }
      .owl-carousel .owl-nav button.owl-next,
      .owl-carousel .owl-nav button.owl-prev,
      .owl-carousel button.owl-dot {
        background: 0 0;
        color: white;
        border: none;
        padding: 0 !important;
        font: inherit;
        background-color: #163977 !important;
      }

      /* Events Calendar Section */
      .events-calendar-section {
        background: #163977;
        color: #fff;
      }
      .event-card {
        display: flex;
        align-items: center;
        background: #d4d4d4;
        border-radius: 12px;
        padding: 15px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .event-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      }
      .event-date {
        text-align: center;
        background: #ffb433;
        color: #163977;
        border-radius: 12px;
        padding: 10px;
        width: 60px;
        margin-right: 15px;
        flex-shrink: 0;
      }
      .event-date .day {
        font-size: 22px;
        font-weight: bold;
        display: block;
      }
      .event-date .month {
        font-size: 14px;
        text-transform: uppercase;
      }
      .event-info .event-title {
        font-size: 18px;
        color: #163977;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .event-info .event-time,
      .event-info .event-location {
        font-size: 14px;
        margin-bottom: 3px;
      }
      .event-info .view-details {
        margin-top: 5px;
        font-size: 12px;
        padding: 3px 8px;
      }

      /* Faculty Card and Tabs */
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
      .nav-pills .nav-link.active {
        background: #ffc107 !important;
        color: #333 !important;
        transition: all 0.3s !important;
      }
      .nav-pills .nav-link {
        border-radius: 30px;
        background-color: #e9ecef;
        color: #333;
      }
    `,
        }}
      />
    </>
  );
}
