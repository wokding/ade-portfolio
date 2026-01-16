import "./App.css";
import { useEffect, useState, useRef } from "react";
import {
  Moon, Sun, Mail, Phone, Linkedin, Github, 
  Code, Award, Briefcase, FileText, CheckCircle,
  ArrowRight, Filter, X, ExternalLink, Globe, ChevronLeft, ChevronRight
} from "lucide-react";
import profile from "./assets/profile.jpg";
import cv from "./assets/Ade-Naufal-Rianto-CV.pdf";

// Network Monitoring Project Images
import networkDashboard from "./assets/network-monitoring/dashboard.png";
import networkUtilisasiFPC from "./assets/network-monitoring/utilisasifpc.png";
import networkUtilisasiPort from "./assets/network-monitoring/utilisasiport.png";
import networkAlarmStatus from "./assets/network-monitoring/alarmstatus.png";
import networkHardwareInventory from "./assets/network-monitoring/hardwareinventory.png";
import networkSystemPerformance from "./assets/network-monitoring/systemperformance.png";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <CheckCircle size={20} />
      <span>{message}</span>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState(null);
  const [skillFilter, setSkillFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const demoRef = useRef(null);
  const [demoVisible, setDemoVisible] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const modalRef = useRef(null);
  const [networkMonitoringSlide, setNetworkMonitoringSlide] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const doorlockVideoUrl = (import.meta.env.VITE_DOORLOCK_VIDEO_URL || "").trim();
  const aprioriVideoUrl = (import.meta.env.VITE_APRIORI_VIDEO_URL || "").trim();
  const sifoVideoUrl = (import.meta.env.VITE_SIFO_VIDEO_URL || "").trim();

  // Network Monitoring Screenshots
  const networkMonitoringImages = [
    { src: networkDashboard, title: "Dashboard Summary" },
    { src: networkUtilisasiFPC, title: "Utilisasi FPC" },
    { src: networkUtilisasiPort, title: "Utilisasi Port" },
    { src: networkAlarmStatus, title: "Alarm Status" },
    { src: networkHardwareInventory, title: "Hardware Inventory" },
    { src: networkSystemPerformance, title: "System Performance" }
  ];

  useEffect(() => {
    // Lazy-load project demo GIF when it enters the viewport
    if (demoRef.current && typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setDemoVisible(true);
              obs.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.25 }
      );
      obs.observe(demoRef.current);
      return () => obs.disconnect();
    }
    // Fallback: if observer not available, load immediately
    setDemoVisible(true);
  }, [demoRef]);

  // Auto-play carousel for Network Monitoring
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setNetworkMonitoringSlide((prev) => 
        prev === networkMonitoringImages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, networkMonitoringImages.length]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (!contactName.trim() || !emailRegex.test(contactEmail) || !contactMessage.trim()) {
      setToast({ message: "Please provide name, a valid email, and a message.", type: "error" });
      return;
    }

    setSending(true);
    try {
      // Formspree endpoint (set to user's provided form)
      const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojvldao";
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
      });

      if (res.ok) {
        setToast({ message: "Message sent — thank you!", type: "success" });
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        setToast({ message: "Failed to send — opening your email client.", type: "error" });
        window.location.href = `mailto:adenaufalr@gmail.com?subject=${encodeURIComponent("Contact from portfolio: "+contactName)}&body=${encodeURIComponent(contactMessage + "\n\nFrom: " + contactEmail)}`;
      }
    } catch (err) {
      setToast({ message: "Network error — opening your email client.", type: "error" });
      window.location.href = `mailto:adenaufalr@gmail.com?subject=${encodeURIComponent("Contact from portfolio: "+contactName)}&body=${encodeURIComponent(contactMessage + "\n\nFrom: " + contactEmail)}`;
    } finally {
      setSending(false);
    }
  };

  const openProjectModal = (project) => {
    setModalProject(project);
    // prevent background scroll
    document.body.style.overflow = "hidden";
    // focus will be set in next tick when modal renders
    setTimeout(() => modalRef.current?.focus(), 0);
  };

  const closeProjectModal = () => {
    setModalProject(null);
    document.body.style.overflow = "";
  };
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });

      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Modal accessibility: trap focus and close on Escape when modal open
  useEffect(() => {
    if (!modalProject) return;

    const root = modalRef.current;
    const focusable = Array.from(root?.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])') || []);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeProjectModal();
        return;
      }
      if (e.key === "Tab") {
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalProject]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ message: "Copied to clipboard!", type: "success" });
  };

  const skillCategories = {
    all: "All Skills",
    routing: "Routing & Switching",
    security: "Security",
    monitoring: "Monitoring",
    infrastructure: "Infrastructure"
  };

  const projectCategories = {
    all: "All Projects",
    network: "Network & Infrastructure",
    iot: "IoT & Hardware",
    web: "Web Development",
    datamining: "Data Mining"
  };

  const skills = {
    routing: [
      "Network Design & Operations",
      "Routing & Switching (BGP, OSPF, IS-IS)",
      "WAN, LAN, VPN, MPLS"
    ],
    infrastructure: [
      "Juniper JunOS (MX, EX, SRX Series)",
      "High Availability & Load Balancing",
      "VLAN, STP, RSTP, MSTP, MC-LAG"
    ],
    security: [
      "Firewall & Network Security",
      "IPv4, IPv6, IP Addressing & Subnetting"
    ],
    monitoring: [
      "Network Monitoring (SNMP, Syslog, NTP)",
      "Troubleshooting & Incident Management",
      "Network Documentation & Topology Diagram"
    ]
  };

  const projects = [
    {
      id: 1,
      category: "network",
      title: "Network Monitoring System",
      tech: ["Python", "Network", "Monitoring"],
    },
    {
      id: 2,
      category: "iot",
      title: "IoT-Based Smart Door Lock System",
      tech: ["Arduino", "C/C++", "Electronics"]
    },
    {
      id: 3,
      category: "web",
      title: "Sales Information System (SIFO Penjualan)",
      tech: ["Web", "Database", "PHP"]
    },
    {
      id: 4,
      category: "datamining",
      title: "Sales Data Mining Using Apriori Algorithm",
      tech: ["Data Mining", "Python", "Business Intelligence"]
    }
  ];

  const filteredSkills = skillFilter === "all" 
    ? Object.values(skills).flat()
    : skills[skillFilter] || [];

  const filteredProjects = projectFilter === "all"
    ? projects
    : projects.filter(p => p.category === projectFilter);

  return (
    <div id="main-content" className="wrapper" role="main" data-theme={darkMode ? "dark" : "light"}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* NAVBAR */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <div className="logo">A.N.R</div>

          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="main-menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>

          <div id="main-menu" className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <a href="#about" className="nav-link">About</a>
            <a href="#cover-letter" className="nav-link">Cover Letter</a>
            <a href="#skills" className="nav-link">Technical Skill</a>
            <a href="#certifications" className="nav-link">Certifications</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={`Switch to ${darkMode ? "light" : "dark"} mode`}
            aria-pressed={darkMode}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-profile">
            <img src={profile} alt="Ade Naufal Rianto" loading="lazy" />
          </div>

          <h1 className="hero-name">ADE NAUFAL RIANTO</h1>
          <h2 className="hero-role">Network Engineer</h2>

          <p className="hero-subtitle">
            Enterprise & Telecommunications · High Availability · Secure Connectivity
          </p>

          <p className="hero-intro">
            Experienced Network Engineer with 7+ years of hands-on experience
            designing, operating, and maintaining enterprise and service provider
            network infrastructures.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Contact Me <ArrowRight size={18} />
            </a>
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FileText size={18} /> Download CV
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-inner">
          <h2>About</h2>
          <div className="content-card fade-in-up">
            <p>
              Network Engineer with 7+ years of experience in IT and telecommunications
              environments, specializing in routing, switching, WAN, and IP-based
              network infrastructure. Proven expertise in designing, implementing,
              monitoring, and troubleshooting enterprise and service provider
              networks. Strong capability in maintaining high availability,
              performance, and security in mission-critical environments. Juniper-
              certified professional with solid operational and analytical skills. Web development and programming skills are primarily applied for internal tools, academic projects, automation, and professional certification purposes, complementing my core role as a Network Engineer.
            </p>
          </div>
        </div>
      </section>

      {/* COVER LETTER */}
      <section id="cover-letter" className="section">
        <div className="section-inner">
          <h2>Cover Letter</h2>
          <div className="content-card fade-in-up">
            <p>Dear Hiring Manager,</p>
            <p>
              My name is Ade Naufal Rianto, and I am writing to express my
              interest in the Network Engineer position. With over seven years
              of hands-on experience in enterprise and telecommunications
              environments, I have developed a strong foundation in designing,
              implementing, and maintaining reliable and secure network
              infrastructures.
            </p>
            <p>
              Currently, I work as a Network Engineer at PT NEC Indonesia, where
              I manage LAN, WAN, and VPN environments, configure routers,
              switches, and firewalls, and ensure high availability across
              mission-critical systems. My responsibilities also include
              network monitoring, incident handling, root cause analysis, and
              maintaining accurate network documentation.
            </p>
            <p>
              I hold Juniper certifications (JNCIS-SP and JNCIA-Junos) and have
              extensive experience working with Juniper devices including MX,
              EX, and SRX series. I am comfortable working with routing protocols
              such as BGP, OSPF, and IS-IS, as well as network security, VLANs,
              and high availability solutions.
            </p>
            <p>
              I am motivated by opportunities that allow me to contribute my
              technical expertise while continuing to grow professionally. I
              value structured environments, clear communication, and teams
              that prioritize reliability and continuous improvement.
            </p>
            <p>
              Thank you for your time and consideration. I would welcome the
              opportunity to further discuss how my skills and experience align
              with your organization's needs.
            </p>
            <p>
              Kind regards,<br />
              <strong>Ade Naufal Rianto</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-inner">
          <h2>Technical Skills</h2>

          <div className="filter-bar">
            <button 
              className={`filter-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} /> Filter Skills
            </button>
            {showFilters && (
              <div className="filter-dropdown">
                {Object.entries(skillCategories).map(([key, label]) => (
                  <button
                    key={key}
                    className={`filter-option ${skillFilter === key ? "active" : ""}`}
                    onClick={() => {
                      setSkillFilter(key);
                      setShowFilters(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="content-card fade-in-up">
            <div className="skills-grid">
              {(skillFilter === "all" ? Object.entries(skills) : [[skillFilter, skills[skillFilter]]]).map(([category, skillList]) => (
                <div key={category} className="skill-group">
                  <h3>{skillCategories[category] || category}</h3>
                  <ul>
                    {skillList.map((skill, idx) => (
                      <li key={idx} className="skill-item">
                        <Code size={16} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <div className="section-inner">
          <h2>Certifications</h2>
          <div className="content-card fade-in-up">
            <div className="certifications-list">
              <div className="cert-item">
                <div className="cert-icon">
                  <Award size={24} />
                </div>
                <div className="cert-content">
                  <h3>Juniper Networks Certified Specialist – Service Provider Routing & Switching (JNCIS-SP)</h3>
                  <p>Advanced service provider routing and switching, including BGP, OSPF, IS-IS, MPLS, and large-scale troubleshooting.</p>
                </div>
              </div>

              <div className="cert-item">
                <div className="cert-icon">
                  <Award size={24} />
                </div>
                <div className="cert-content">
                  <h3>Juniper Networks Certified Associate – Junos (JNCIA-Junos)</h3>
                  <p>Foundational knowledge of Junos OS, routing, switching, and security concepts.</p>
                </div>
              </div>

              <div className="cert-item">
                <div className="cert-icon">
                  <Code size={24} />
                </div>
                <div className="cert-content">
                  <h3>Junior Web Developer – BNSP</h3>
                  <p>National certification covering HTML, CSS, JavaScript, and basic database fundamentals.</p>
                </div>
              </div>

              <div className="cert-item">
                <div className="cert-icon">
                  <FileText size={24} />
                </div>
                <div className="cert-content">
                  <h3>TOEFL ITP – Englishvit</h3>
                  <p>English proficiency: Intermediate certification measuring listening, structure, and reading comprehension skills for academic and professional purposes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <div className="section-inner">
          <h2>Education</h2>

          <div className="content-card fade-in-up">
            <div className="education-item">
              <h3>Bachelor of Computer Science</h3>
              <span>Universitas Bhayangkara Jakarta Raya · 2017 – 2021</span>
              <p>
                Focused on computer networks, information systems, and basic software
                development. Completed academic projects related to networking,
                system analysis, and IT infrastructure.
              </p>

              <hr />

              <h4>Student Organization & Leadership Experience</h4>
              <p>
                Actively involved in <strong>Pena Muda Student Activity Unit (UKM)</strong>,
                a campus literary and creative organization. Served as the
                <strong> Chief Organizer</strong> for the event
                <em> "Penanniversary: Poetry Night – Harmoni Simfoni"</em>, which was part
                of a series of activities celebrating the fourth anniversary of Pena Muda.
              </p>

              <p>
                In this role, I was responsible for coordinating the event planning,
                managing the organizing committee, overseeing event execution, and
                ensuring collaboration between internal members and external participants.
                The event received public attention and was covered by national media.
              </p>

              <p>
                Media coverage:{" "}
                <a
                  href="https://www.liputan6.com/citizen6/read/3204154/malam-puisi-ala-ukm-pena-muda-universitas-bhayangkara-bekasi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Liputan6.com – Poetry Night by UKM Pena Muda
                </a>
              </p>

              <div style={{ marginTop: '1rem' }}>
                <a
                  href="https://www.liputan6.com/citizen6/read/3204154/malam-puisi-ala-ukm-pena-muda-universitas-bhayangkara-bekasi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn1-production-images-kly.akamaized.net/c14HG9XUFQBg8OHoVbSqnTwrRY0=/2560x1440/smart/filters:quality(75):strip_icc()/kly-media-production/medias/1810037/original/056234700_1513929472-PicsArt_12-22-02.00.17.jpg"
                    alt="Poetry Night - Harmoni Simfoni by UKM Pena Muda"
                    style={{
                      width: '100%',
                      maxWidth: '600px',
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
                <p style={{ 
                  marginTop: '0.5rem', 
                  fontSize: '0.875rem', 
                  color: '#64748b',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  maxWidth: '600px'
                }}>
                  This event was held to commemorate the fourth anniversary of Pena Muda (Photo source: UKM Pena Muda Private Documentation)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="section-inner">
          <h2>Professional Experience</h2>
          <div className="content-card fade-in-up">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker">
                  <Briefcase size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Network Engineer — PT NEC Indonesia</h3>
                  <span>Feb 2023 – Dec 2025 · South Jakarta</span>
                  <ul>
                    <li>Design, implement, and maintain LAN, WAN, and VPN network infrastructures.</li>
                    <li>Configure, manage, and troubleshoot routers, switches, and firewalls.</li>
                    <li>Monitor network performance to ensure high availability, reliability, and security.</li>
                    <li>Handle network incidents, root cause analysis, and change management activities.</li>
                    <li>Coordinate with internal teams and clients for on-site technical support.</li>
                    <li>Develop and maintain network documentation, configurations, and topology diagrams.</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">
                  <Briefcase size={20} />
                </div>
                <div className="timeline-content">
                  <h3>IT Support Technician — PT NEC Indonesia</h3>
                  <span>Apr 2018 – Feb 2023 · South Jakarta</span>
                  <ul>
                    <li>Provided daily technical support for hardware, software, and network issues.</li>
                    <li>Installed, configured, and maintained PCs, laptops, printers, and peripherals.</li>
                    <li>Troubleshot Windows OS and office productivity applications.</li>
                    <li>Supported basic networking including LAN, Wi-Fi, and IP addressing.</li>
                    <li>Managed IT support tickets, escalation processes, and asset documentation.</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">
                  <Briefcase size={20} />
                </div>
                <div className="timeline-content">
                  <h3>IT Consultant (Engineering on Site) — PT Kimia Farma Apotek</h3>
                  <span>Apr 2018 – Sep 2021 · Bekasi</span>
                  <ul>
                    <li>Delivered on-site IT support for retail pharmacy branches.</li>
                    <li>Installed and maintained POS systems and branch network infrastructure.</li>
                    <li>Troubleshot internal applications and operational systems.</li>
                    <li>Coordinated incident resolution with head office IT teams.</li>
                    <li>Provided user training and ensured operational system stability.</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">
                  <Briefcase size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Administration Project — PT Tirta Alam Segar (Wings Food)</h3>
                  <span>Jan 2016 – Aug 2017 · Cibitung</span>
                  <ul>
                    <li>Manage project administrative documentation and reports.</li>
                    <li>Support coordination between project teams and related stakeholders.</li>
                    <li>Monitor project progress and prepare periodic status reports.</li>
                    <li>Handle document control, filing, and correspondence.</li>
                    <li>Provide administrative support for on-site project operations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL FOCUS */}
      <section id="statement" className="section">
        <div className="section-inner">
          <h2>Professional Focus</h2>

          <div className="content-card fade-in-up">
            <blockquote>
              "Focused on maintaining high-availability and secure network infrastructures in enterprise and mission-critical environments. Experienced in operational excellence, incident management, and continuous service improvement, with strong attention to reliability, documentation, and teamwork."
            </blockquote>
          </div>
        </div>
      </section>

      {/* PROJECTS & ACHIEVEMENTS */}
      <section id="projects" className="section">
        <div className="section-inner">
          <h2>Projects & Achievements</h2>

          <div className="filter-bar">
            <button 
              className={`filter-btn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} /> Filter Projects
            </button>
            {showFilters && (
              <div className="filter-dropdown">
                {Object.entries(projectCategories).map(([key, label]) => (
                  <button
                    key={key}
                    className={`filter-option ${projectFilter === key ? "active" : ""}`}
                    onClick={() => {
                      setProjectFilter(key);
                      setShowFilters(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="content-card fade-in-up">
                {filteredProjects.map((project, idx) => (
              <div key={project.id} className={`job project-card ${idx > 0 ? "has-divider" : ""}`}>
                {idx > 0 && <hr />}
                <div className="project-header">
                  <div>
                    <h3>{project.title}</h3>
                    <span className="project-category">{projectCategories[project.category]}</span>
                  </div>
                  <div className="tech-badges">
                      {project.tech.map((t, i) => (
                        <span key={i} className="badge">{t}</span>
                      ))}
                    </div>
                    <div style={{marginLeft:8}}>
                      <button className="filter-btn" onClick={() => openProjectModal(project)} aria-label={`View details for ${project.title}`}>
                        View details
                      </button>
                    </div>
                </div>

                {project.id === 1 && (
                  <>
                    <div style={{position: "relative", marginBottom: "1rem"}}>
                      <img
                        src={networkMonitoringImages[networkMonitoringSlide].src}
                        alt={networkMonitoringImages[networkMonitoringSlide].title}
                        onClick={() => setZoomedImage(networkMonitoringImages[networkMonitoringSlide])}
                        style={{
                          width: "100%", 
                          height: "auto", 
                          display: "block", 
                          cursor: "zoom-in", 
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoPlaying(false);
                          setNetworkMonitoringSlide((prev) => (prev === 0 ? networkMonitoringImages.length - 1 : prev - 1));
                        }}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          zIndex: 10,
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)"}
                        aria-label="Previous slide"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoPlaying(false);
                          setNetworkMonitoringSlide((prev) => (prev === networkMonitoringImages.length - 1 ? 0 : prev + 1));
                        }}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          zIndex: 10,
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)"}
                        aria-label="Next slide"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "12px",
                        padding: "8px 0"
                      }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAutoPlaying(!isAutoPlaying);
                          }}
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text-primary)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                        >
                          {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
                        </button>
                        <div style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center"
                        }}>
                          {networkMonitoringImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsAutoPlaying(false);
                                setNetworkMonitoringSlide(idx);
                              }}
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: networkMonitoringSlide === idx ? "var(--primary)" : "var(--border)",
                                cursor: "pointer",
                                padding: 0,
                                transition: "all 0.2s"
                              }}
                              onMouseEnter={(e) => {
                                if (networkMonitoringSlide !== idx) {
                                  e.currentTarget.style.backgroundColor = "var(--text-secondary)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (networkMonitoringSlide !== idx) {
                                  e.currentTarget.style.backgroundColor = "var(--border)";
                                }
                              }}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                        <div style={{
                          color: "var(--text-secondary)",
                          fontSize: "14px",
                          fontWeight: "500"
                        }}>
                          {networkMonitoringImages[networkMonitoringSlide].title}
                        </div>
                      </div>
                    </div>

                    <p>
                      Developed a network monitoring system to track and analyze network device status,
                      performance metrics, and connectivity health in real-time. This project demonstrates
                      practical application of network automation and monitoring concepts using Python
                      scripting and network protocols.
                    </p>

                    <ul>
                      <li>Implemented automated network device monitoring using ICMP (ping) and SNMP protocols.</li>
                      <li>Developed Python scripts to collect performance metrics and device availability data.</li>
                      <li>Created alerting mechanisms to notify administrators of network issues and anomalies.</li>
                      <li>Built data visualization dashboards to display network health and historical trends.</li>
                      <li>Integrated logging system for incident tracking and troubleshooting support.</li>
                      <li>Documented system architecture, configuration procedures, and monitoring workflows.</li>
                    </ul>

                    <div style={{display: "flex", flexDirection: "column", gap: 8, marginTop: 12}}>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Github size={16} style={{flexShrink: 0}} />
                        <strong>Source Code:</strong>{" "}
                        <a
                          href="https://github.com/wokding/monitoringnetwork"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          github.com/wokding/monitoringnetwork
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {project.id === 2 && (
                  <>
                    <div className="project-demo" ref={demoRef}>
                      {demoVisible ? (
                        doorlockVideoUrl ? (
                          <video
                            src={doorlockVideoUrl}
                            muted
                            loop
                            playsInline
                            autoPlay
                            controls
                          />
                        ) : (
                          <div className="demo-placeholder" aria-label="Doorlock demo unavailable">
                            <div className="placeholder-art" aria-hidden="true" />
                            <span>Doorlock demo video belum tersedia.</span>
                          </div>
                        )
                      ) : (
                        <div className="demo-placeholder">
                          <div className="placeholder-art" aria-hidden="true" />
                          <button
                            className="btn-secondary"
                            onClick={() => setDemoVisible(true)}
                            aria-label="Load demo"
                          >
                            Load demo
                          </button>
                        </div>
                      )}
                    </div>

                    <p>
                      Designed and implemented an IoT-based smart door lock system using
                      Arduino as the main controller. The project focused on improving
                      physical access security by integrating electronic locking mechanisms
                      with programmable control logic.
                    </p>

                    <ul>
                      <li>Developed firmware logic using C/C++ to control door lock actuators and input devices.</li>
                      <li>Integrated hardware components including microcontroller, relay, and electronic lock modules.</li>
                      <li>Implemented access control logic to handle secure lock and unlock operations.</li>
                      <li>Conducted functional testing to ensure system reliability and stable operation.</li>
                      <li>Created technical documentation covering system architecture, wiring, and code structure.</li>
                    </ul>

                    <div style={{display: "flex", flexDirection: "column", gap: 8, marginTop: 12}}>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Globe size={16} style={{flexShrink: 0}} />
                        <strong>Demo:</strong>{" "}
                        <a
                          href="https://wokwi.com/projects/439156597558534145"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          wokwi.com/projects/439156597558534145
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Github size={16} style={{flexShrink: 0}} />
                        <strong>Source Code:</strong>{" "}
                        <a
                          href="https://github.com/wokding/arduino-doorlock-NEW"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          github.com/wokding/arduino-doorlock-NEW
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {project.id === 3 && (
                  <>
                    <div className="project-demo">
                      {sifoVideoUrl ? (
                        <video
                          src={sifoVideoUrl}
                          muted
                          loop
                          playsInline
                          autoPlay
                          controls
                        />
                      ) : (
                        <div className="demo-placeholder" aria-label="SIFO demo unavailable">
                          <div className="placeholder-art" aria-hidden="true" />
                          <span>SIFO demo video belum tersedia.</span>
                        </div>
                      )}
                    </div>

                    <p>
                      Developed a web-based sales information system designed to manage product
                      data, customer transactions, and sales reporting. This project was also
                      utilized as a practical learning and assessment material for professional
                      certification preparation under the Junior Web Developer competency scheme.
                    </p>

                    <ul>
                      <li>Designed system workflow and database structure to support sales, inventory, and transaction management.</li>
                      <li>Implemented core application features including product management, sales transactions, and reporting modules.</li>
                      <li>Applied role-based access concepts to separate user responsibilities within the system.</li>
                      <li>Used the system as a hands-on practice case for professional competency development.</li>
                      <li>Conducted functional testing to ensure data consistency and proper transaction handling.</li>
                      <li>Prepared technical documentation to support evaluation, deployment, and future enhancements.</li>
                    </ul>

                    <div style={{display: "flex", flexDirection: "column", gap: 8, marginTop: 12}}>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Globe size={16} style={{flexShrink: 0}} />
                        <strong>Live Demo:</strong>{" "}
                        <a
                          href="https://sipenjual.free.nf/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          sipenjual.free.nf
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Github size={16} style={{flexShrink: 0}} />
                        <strong>Source Code:</strong>{" "}
                        <a
                          href="https://github.com/wokding/sifopenjualan"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          github.com/wokding/sifopenjualan
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {project.id === 4 && (
                  <>
                    <div className="project-demo">
                      {aprioriVideoUrl ? (
                        <video
                          src={aprioriVideoUrl}
                          muted
                          loop
                          playsInline
                          autoPlay
                          controls
                        />
                      ) : (
                        <div className="demo-placeholder" aria-label="Apriori demo unavailable">
                          <div className="placeholder-art" aria-hidden="true" />
                          <span>Apriori demo video belum tersedia.</span>
                        </div>
                      )}
                    </div>

                    <p>
                      Developed a data mining system as part of an undergraduate thesis titled
                      <em>
                        {" "}
                        "Implementation of Data Mining Sales of Over-the-counter Drugs with Apriori Algorithm
                        (Case Study: Kimia Farma Pharmacy Summarecon Bekasi)."
                      </em>
                      The project aimed to analyze sales transaction data of over-the-counter
                      medicines to discover meaningful association rules that support business decision-making.
                    </p>

                    <ul>
                      <li>Implemented the Apriori algorithm to identify frequent itemsets and association rules.</li>
                      <li>Analyzed purchasing patterns of over-the-counter medicines to reveal product combinations.</li>
                      <li>Applied data preprocessing techniques to improve data quality and algorithm accuracy.</li>
                      <li>Evaluated algorithm results using minimum support and confidence thresholds.</li>
                      <li>Presented analytical results to support inventory planning and product placement strategies.</li>
                    </ul>

                    <p>
                      This thesis project was successfully completed with <strong>excellent
                        academic results</strong>, and the author graduated with the
                      <strong> Cum Laude </strong> distinction.
                    </p>

                    <div style={{display: "flex", flexDirection: "column", gap: 8, marginTop: 12}}>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Globe size={16} style={{flexShrink: 0}} />
                        <strong>Live Demo:</strong>{" "}
                        <a
                          href="https://siapriori.free.nf/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          siapriori.free.nf
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: 8}}>
                        <Github size={16} style={{flexShrink: 0}} />
                        <strong>Source Code:</strong>{" "}
                        <a
                          href="https://github.com/wokding/apriori"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{display: "flex", alignItems: "center", gap: 4}}
                        >
                          github.com/wokding/apriori
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="section-inner">
          <h2>Contact</h2>
          <div className="content-card fade-in-up">
            <p>
              I am open to professional opportunities and further discussions.
              Please feel free to reach out through the contact details below or send a message using the form.
            </p>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="form-row">
                <input
                  className="form-field"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  aria-label="Your name"
                  required
                />
                <input
                  className="form-field"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  aria-label="Your email"
                  required
                />
              </div>

              <div className="form-row">
                <textarea
                  className="form-field"
                  name="message"
                  placeholder="Write your message"
                  rows={5}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  aria-label="Message"
                  required
                />
              </div>

              <div className="form-row">
                <button className="btn-primary form-submit" type="submit" disabled={sending} aria-disabled={sending}>
                  {sending ? "Sending…" : "Send Message"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    // quick mailto fallback
                    window.location.href = `mailto:adenaufalr@gmail.com?subject=${encodeURIComponent("Contact from portfolio: "+contactName)}&body=${encodeURIComponent(contactMessage + "\n\nFrom: " + contactEmail)}`;
                  }}
                >
                  Email Instead
                </button>
              </div>
            </form>

            <ul className="contact-list">
              <li>
                <Mail size={20} />
                <div>
                  <strong>Email:</strong>
                  <button 
                    className="contact-link"
                    onClick={() => copyToClipboard("adenaufalr@gmail.com")}
                  >
                    adenaufalr@gmail.com
                  </button>
                </div>
              </li>
              <li>
                <Phone size={20} />
                <div>
                  <strong>WhatsApp:</strong>
                  <a
                    href="https://wa.me/6281385436440"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    +62 813-8543-6440
                  </a>
                </div>
              </li>
              <li>
                <Linkedin size={20} />
                <div>
                  <strong>LinkedIn:</strong>
                  <a
                    href="https://www.linkedin.com/in/ade-naufal-rianto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    linkedin.com/in/ade-naufal-rianto
                  </a>
                </div>
              </li>
              <li>
                <Github size={20} />
                <div>
                  <strong>GitHub:</strong>
                  <a
                    href="https://github.com/wokding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    github.com/wokding
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          © 2025 Ade Naufal Rianto · Network Engineer
        </div>
      </footer>

      {modalProject && (
        <div className="modal-overlay" role="presentation" onClick={closeProjectModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeProjectModal} aria-label="Close dialog">×</button>
            <h3 id="modal-title">{modalProject.title}</h3>
            <p className="project-category">{projectCategories[modalProject.category]}</p>
            <div className="modal-body">
              {modalProject.id === 1 && (
                <>
                  <div style={{position: "relative", marginBottom: "1.5rem"}}>
                    <img
                      src={networkMonitoringImages[networkMonitoringSlide].src}
                      alt={networkMonitoringImages[networkMonitoringSlide].title}
                      onClick={() => setZoomedImage(networkMonitoringImages[networkMonitoringSlide])}
                      style={{
                        width: "100%", 
                        height: "auto", 
                        display: "block", 
                        cursor: "zoom-in", 
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(false);
                        setNetworkMonitoringSlide((prev) => (prev === 0 ? networkMonitoringImages.length - 1 : prev - 1));
                      }}
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)"}
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(false);
                        setNetworkMonitoringSlide((prev) => (prev === networkMonitoringImages.length - 1 ? 0 : prev + 1));
                      }}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)"}
                      aria-label="Next slide"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      padding: "8px 0"
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoPlaying(!isAutoPlaying);
                        }}
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "8px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                      >
                        {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
                      </button>
                      <div style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center"
                      }}>
                        {networkMonitoringImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAutoPlaying(false);
                              setNetworkMonitoringSlide(idx);
                            }}
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              border: "none",
                              backgroundColor: networkMonitoringSlide === idx ? "var(--primary)" : "var(--border)",
                              cursor: "pointer",
                              padding: 0,
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              if (networkMonitoringSlide !== idx) {
                                e.currentTarget.style.backgroundColor = "var(--text-secondary)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (networkMonitoringSlide !== idx) {
                                e.currentTarget.style.backgroundColor = "var(--border)";
                              }
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                      <div style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        {networkMonitoringImages[networkMonitoringSlide].title}
                      </div>
                    </div>
                  </div>

                  <p style={{marginTop:12}}>
                    This network monitoring system was developed to provide automated network infrastructure 
                    monitoring, health checking, and performance analysis. The system helps network engineers 
                    proactively identify issues, track device status, and maintain optimal network performance 
                    through continuous monitoring and alerting mechanisms.
                  </p>
                  <h4 style={{marginTop:16}}>Key Features:</h4>
                  <ul>
                    <li>Real-time network device availability monitoring using ICMP ping</li>
                    <li>SNMP-based performance metric collection (bandwidth, CPU, memory usage)</li>
                    <li>Automated alerting system for device down events and threshold violations</li>
                    <li>Historical data storage and trend analysis capabilities</li>
                    <li>Web-based dashboard for visualization and reporting</li>
                    <li>Multi-device support with customizable monitoring intervals</li>
                  </ul>
                  <h4 style={{marginTop:16}}>Technical Implementation:</h4>
                  <p>
                    Built using Python with libraries including Scapy for ICMP operations, PySNMP for SNMP 
                    polling, and Flask for web interface. The monitoring engine runs as a background service, 
                    continuously checking configured network devices and collecting performance metrics at 
                    specified intervals.
                  </p>
                  <p>
                    Data is stored in SQLite database for historical analysis and trend reporting. The alert 
                    system supports multiple notification methods including email and log files. The web 
                    dashboard provides real-time status views and historical graphs for performance analysis.
                  </p>
                  <h4 style={{marginTop:16}}>Use Cases:</h4>
                  <ul>
                    <li>Small to medium enterprise network monitoring</li>
                    <li>Network troubleshooting and incident management support</li>
                    <li>Performance baseline establishment and capacity planning</li>
                    <li>Network automation and DevOps integration</li>
                  </ul>
                  <div style={{marginTop:12}}>
                    <strong>Technologies:</strong> {modalProject.tech.join(", ")}
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Github size={16} style={{flexShrink: 0}} />
                    <strong>Source Code:</strong>{" "}
                    <a href="https://github.com/wokding/monitoringnetwork" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      github.com/wokding/monitoringnetwork
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </>
              )}
              {modalProject.id === 2 && (
                <div className="project-demo">
                  {doorlockVideoUrl ? (
                    <video
                      src={doorlockVideoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls
                    />
                  ) : (
                    <div className="demo-placeholder" aria-label="Doorlock demo unavailable">
                      <div className="placeholder-art" aria-hidden="true" />
                      <span>Doorlock demo video belum tersedia.</span>
                    </div>
                  )}
                </div>
              )}
              {modalProject.id === 3 && (
                <div className="project-demo">
                  {sifoVideoUrl ? (
                    <video
                      src={sifoVideoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls
                    />
                  ) : (
                    <div className="demo-placeholder" aria-label="SIFO demo unavailable">
                      <div className="placeholder-art" aria-hidden="true" />
                      <span>SIFO demo video belum tersedia.</span>
                    </div>
                  )}
                </div>
              )}
              {modalProject.id === 4 && (
                <div className="project-demo">
                  {aprioriVideoUrl ? (
                    <video
                      src={aprioriVideoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls
                    />
                  ) : (
                    <div className="demo-placeholder" aria-label="Apriori demo unavailable">
                      <div className="placeholder-art" aria-hidden="true" />
                      <span>Apriori demo video belum tersedia.</span>
                    </div>
                  )}
                </div>
              )}
              {modalProject.id === 2 && (
                <>
                  <p style={{marginTop:12}}>
                    This IoT-based smart door lock system was developed to enhance physical access security by 
                    integrating electronic locking mechanisms with programmable control logic using Arduino 
                    microcontroller. The project demonstrates practical implementation of embedded systems 
                    and IoT concepts for real-world security applications.
                  </p>
                  <h4 style={{marginTop:16}}>Key Features:</h4>
                  <ul>
                    <li>Arduino-based microcontroller system for reliable hardware control</li>
                    <li>Electronic lock mechanism with relay module for actuator control</li>
                    <li>Multiple authentication methods (keypad, RFID, or remote access)</li>
                    <li>Real-time access logging and monitoring capabilities</li>
                    <li>Battery backup system for uninterrupted operation</li>
                  </ul>
                  <h4 style={{marginTop:16}}>Technical Implementation:</h4>
                  <p>
                    The system architecture includes an Arduino microcontroller as the central processing unit, 
                    interfaced with various input devices (keypad matrix, RFID reader) and output components 
                    (electromagnetic lock, relay module, LCD display). The firmware was developed in C/C++ to 
                    handle user authentication, access control logic, and secure lock/unlock operations.
                  </p>
                  <p>
                    Special attention was given to security considerations including encrypted credential storage, 
                    timeout mechanisms, and fail-safe modes. The system was thoroughly tested for reliability, 
                    response time, and power efficiency.
                  </p>
                  <div style={{marginTop:12}}>
                    <strong>Technologies:</strong> {modalProject.tech.join(", ")}
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Globe size={16} style={{flexShrink: 0}} />
                    <strong>Demo:</strong>{" "}
                    <a href="https://wokwi.com/projects/439156597558534145" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      wokwi.com/projects/439156597558534145
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Github size={16} style={{flexShrink: 0}} />
                    <strong>Source Code:</strong>{" "}
                    <a href="https://github.com/wokding/arduino-doorlock-NEW" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      github.com/wokding/arduino-doorlock-NEW
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </>
              )}
              {modalProject.id === 3 && (
                <>
                  <p style={{marginTop:12}}>
                    SIFO Penjualan is a comprehensive web-based sales information system designed to streamline 
                    product management, customer transactions, and sales reporting processes. This project was 
                    developed as both a practical business solution and a learning tool for professional 
                    certification under the Junior Web Developer competency scheme.
                  </p>
                  <h4 style={{marginTop:16}}>Core Functionality:</h4>
                  <ul>
                    <li>Product catalog management with categories, pricing, and inventory tracking</li>
                    <li>Customer registration and profile management system</li>
                    <li>Point of sale (POS) interface for quick transaction processing</li>
                    <li>Sales reporting with filters for date range, product, and customer</li>
                    <li>Role-based access control for admin, sales, and manager roles</li>
                    <li>Invoice generation and printing capabilities</li>
                  </ul>
                  <h4 style={{marginTop:16}}>System Architecture:</h4>
                  <p>
                    Built using PHP backend with MySQL database for data persistence, the system follows 
                    MVC (Model-View-Controller) pattern for clean code organization. The front-end utilizes 
                    HTML5, CSS3, and JavaScript for responsive user interface design. Bootstrap framework 
                    was integrated to ensure mobile-friendly layouts and consistent styling.
                  </p>
                  <p>
                    Database design includes normalized tables for products, customers, transactions, and 
                    transaction details, with proper indexing for optimized query performance. The system 
                    implements input validation, SQL injection prevention, and session management for security.
                  </p>
                  <div style={{marginTop:12}}>
                    <strong>Technologies:</strong> {modalProject.tech.join(", ")}
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Globe size={16} style={{flexShrink: 0}} />
                    <strong>Live Demo:</strong>{" "}
                    <a href="https://sipenjual.free.nf/" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      sipenjual.free.nf
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Github size={16} style={{flexShrink: 0}} />
                    <strong>Source Code:</strong>{" "}
                    <a href="https://github.com/wokding/sifopenjualan" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      github.com/wokding/sifopenjualan
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </>
              )}
              {modalProject.id === 4 && (
                <>
                  <p style={{marginTop:12}}>
                    This data mining project implements the Apriori algorithm to analyze sales patterns of 
                    over-the-counter medicines at Kimia Farma Pharmacy. Completed as an undergraduate thesis, 
                    the system discovers meaningful association rules to support inventory planning and 
                    product placement strategies. The research earned <strong>Cum Laude</strong> distinction.
                  </p>
                  <h4 style={{marginTop:16}}>Research Objectives:</h4>
                  <ul>
                    <li>Identify frequently purchased medicine combinations (frequent itemsets)</li>
                    <li>Discover association rules between products with high confidence levels</li>
                    <li>Provide actionable insights for inventory optimization</li>
                    <li>Support cross-selling and product bundling decisions</li>
                  </ul>
                  <h4 style={{marginTop:16}}>Methodology:</h4>
                  <p>
                    Transaction data from Kimia Farma Pharmacy Summarecon Bekasi was collected and preprocessed 
                    to remove noise and inconsistencies. The Apriori algorithm was implemented to generate 
                    candidate itemsets and prune those below minimum support threshold. Association rules 
                    were then extracted and evaluated based on support, confidence, and lift metrics.
                  </p>
                  <p>
                    The analysis revealed significant patterns such as common medicine combinations purchased 
                    together, seasonal trends, and complementary product relationships. Results were visualized 
                    using charts and tables to present findings in business-friendly formats.
                  </p>
                  <h4 style={{marginTop:16}}>Technical Details:</h4>
                  <p>
                    Developed using Python with libraries including Pandas for data manipulation, Mlxtend 
                    for Apriori algorithm implementation, and Matplotlib/Seaborn for data visualization. 
                    The system includes data preprocessing pipeline, algorithm parameter tuning, and 
                    interactive result exploration interface.
                  </p>
                  <div style={{marginTop:12}}>
                    <strong>Technologies:</strong> {modalProject.tech.join(", ")}
                  </div>
                  <div style={{marginTop:8}}>
                    <strong>Academic Achievement:</strong> Graduated with <strong>Cum Laude</strong> honors
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Globe size={16} style={{flexShrink: 0}} />
                    <strong>Live Demo:</strong>{" "}
                    <a href="https://siapriori.free.nf/" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      siapriori.free.nf
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div style={{marginTop:8, display: "flex", alignItems: "center", gap: 8}}>
                    <Github size={16} style={{flexShrink: 0}} />
                    <strong>Source Code:</strong>{" "}
                    <a href="https://github.com/wokding/apriori" target="_blank" rel="noopener noreferrer" style={{display: "flex", alignItems: "center", gap: 4}}>
                      github.com/wokding/apriori
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {zoomedImage && (
        <div 
          className="modal-overlay" 
          role="presentation" 
          onClick={() => setZoomedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "20px"
          }}
        >
          <div style={{
            position: "relative",
            maxWidth: "95vw",
            maxHeight: "95vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <button 
              onClick={() => setZoomedImage(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "24px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10001
              }}
              aria-label="Close zoom"
            >
              ×
            </button>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)"
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <div style={{
              marginTop: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              textAlign: "center"
            }}>
              {zoomedImage.title}
            </div>
          </div>
        </div>
      )}

      <button
        className={`scroll-top ${showScrollTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}
