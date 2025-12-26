import "./App.css";
import profile from "./assets/profile.jpg";
import cv from "./assets/Ade-Naufal-Rianto-CV.pdf";

export default function App() {
  return (
    <div className="wrapper">
      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">Ade Naufal Rianto</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#cover-letter">Cover Letter</a>
            <a href="#skills">Technical Skill</a>
            <a href="#certifications">Certifications</a>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-profile">
            <img src={profile} alt="Ade Naufal Rianto" />
          </div>

          {/* NAME */}
          <h1 className="hero-name">Ade Naufal Rianto</h1>

          {/* ROLE */}
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
              Contact Me
            </a>
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-inner">
          <h2>About</h2>
          <div className="content-card">
            <p>
              Network Engineer with 7+ years of experience in IT and telecommunications
              environments, specializing in routing, switching, WAN, and IP-based
              network infrastructure. Proven expertise in designing, implementing,
              monitoring, and troubleshooting enterprise and service provider
              networks. Strong capability in maintaining high availability,
              performance, and security in mission-critical environments. Juniper-
              certified professional with solid operational and analytical skills.
            </p>
          </div>
        </div>
      </section>

      {/* COVER LETTER */}
      <section id="cover-letter" className="section">
        <div className="section-inner">
          <h2>Cover Letter</h2>
          <div className="content-card">
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
              with your organization’s needs.
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

          <div className="content-card">
            <div className="skills-grid">
              <ul>
                <li>Network Design & Operations</li>
                <li>Routing & Switching (BGP, OSPF, IS-IS)</li>
                <li>WAN, LAN, VPN, MPLS</li>
                <li>Juniper JunOS (MX, EX, SRX Series)</li>
                <li>High Availability & Load Balancing</li>
                <li>VLAN, STP, RSTP, MSTP, MC-LAG</li>
              </ul>

              <ul>
                <li>Firewall & Network Security</li>
                <li>IPv4, IPv6, IP Addressing & Subnetting</li>
                <li>Network Monitoring (SNMP, Syslog, NTP)</li>
                <li>Troubleshooting & Incident Management</li>
                <li>Network Documentation & Topology Diagram</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <div className="section-inner">
          <h2>Certifications</h2>
          <div className="content-card">
            <ul>
              <li>
                <strong>
                  Juniper Networks Certified Specialist – Service Provider
                  Routing & Switching (JNCIS-SP)
                </strong>
                <br />
                Advanced service provider routing and switching, including BGP,
                OSPF, IS-IS, MPLS, and large-scale troubleshooting.
              </li>
              <li>
                <strong>
                  Juniper Networks Certified Associate – Junos (JNCIA-Junos)
                </strong>
                <br />
                Foundational knowledge of Junos OS, routing, switching, and
                security concepts.
              </li>
              <li>
                <strong>Junior Web Developer – BNSP</strong>
                <br />
                National certification covering HTML, CSS, JavaScript, and basic
                database fundamentals.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <div className="section-inner">
          <h2>Education</h2>

          <div className="content-card">
            <div className="education-item">
              <h3>Bachelor of Computer Science</h3>
              <span>Universitas Bhayangkara Jakarta Raya · 2017 – 2021</span>
              <p>
                Focused on computer networks, information systems, and basic software
                development. Completed academic projects related to networking,
                system analysis, and IT infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="section-inner">
          <h2>Professional Experience</h2>
          <div className="content-card">
            <div className="job">
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

            <div className="job">
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

            <div className="job">
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

            <div className="job">
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
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="section-inner">
          <h2>Contact</h2>
          <div className="content-card">
            <p>
              I am open to professional opportunities and further discussions.
              Please feel free to reach out through the contact details below.
            </p>
            <ul className="contact-list">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:adenaufalr@gmail.com">
                  adenaufalr@gmail.com
                </a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/6281385436440"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 813-8543-6440
                </a>
              </li>
              <li>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/in/ade-naufal-rianto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/ade-naufal-rianto
                </a>
              </li>
              <li>
                <strong>Location:</strong> Jakarta / West Java, Indonesia
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
    </div>
  );
}
