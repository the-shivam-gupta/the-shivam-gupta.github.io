import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import './style.css'

const Portfolio: React.FC = () => {
  const typedElRef = useRef<HTMLSpanElement | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [alertState, setAlertState] = useState<{ visible: boolean; text: string; bg: string; color: string }>({ visible: false, text: '', bg: '', color: '' })

  useEffect(() => {
    const typed = new Typed(typedElRef.current as Element, {
      strings: ['Web Scrapping','Mobile Developer', 'Full Stack Engineer'],
      typeSpeed: 50,
      backSpeed: 50,
      cursorChar: '|',
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowSplash(false), 8000)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    function handleReveal() {
      const elements = document.querySelectorAll('.reveal')
      const windowHeight = window.innerHeight
      const elementVisible = 150
      elements.forEach((el) => {
        const elementTop = (el as HTMLElement).getBoundingClientRect().top
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
      })
    }
    function onScroll() {
      handleReveal()
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({ top: 0 })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(sectionId: string) {
    const section = document.getElementById(sectionId)
    if (section) window.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
  }

  function handleArrowClick() {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const firstName = (form.elements.namedItem('first_name') as HTMLInputElement)?.value.trim()
    const lastName = (form.elements.namedItem('last_name') as HTMLInputElement)?.value.trim()
    const email = (form.elements.namedItem('e-mail') as HTMLInputElement)?.value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim()
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/
    if (!firstName || !lastName || !message) {
      setAlertState({ visible: true, text: 'Ensure that all fields are filled out accurately.', bg: 'red', color: 'white' })
    } else if (!emailRegex.test(email)) {
      setAlertState({ visible: true, text: 'The email entered is invalid.', bg: 'red', color: 'white' })
    } else {
      setAlertState({ visible: true, text: "Thanks for your message. I'll respond soon.", bg: 'green', color: 'white' })
      form.reset()
      setTimeout(() => setAlertState((s) => ({ ...s, visible: false })), 3000)
    }
  }

  return (
    <>
      <a
        id="button"
        className={showBackToTop ? 'show' : ''}
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />

      <div className="header" id="home">
        <div className="logo">
          <h2>Riku Sato</h2>
          <h2>Riku Sato</h2>
        </div>
        <div className="__container">
          <div className="navbar2">
            <div className="header2">
              <ul className="menu2">
                <li data-section="home" onClick={() => goTo('home')}>Home</li>
                <li data-section="about" onClick={() => goTo('about')}>About</li>
                <li data-section="project" onClick={() => goTo('project')}>Project</li>
                <li data-section="skills" onClick={() => goTo('skills')}>Skills</li>
                <li data-section="contact" onClick={() => goTo('contact')}>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showSplash && (
        <div id="splash-screen" className={showSplash ? '' : 'hidden'}>
          <section className="splash-content">
            <video src="/smoke1.mp4" autoPlay muted></video>
            <h1>
              <span>R</span>&nbsp;
              <span>I</span>&nbsp;
              <span>K</span>&nbsp;
              <span>U</span>&nbsp;
              <br />
              <span>S</span>&nbsp;
              <span>A</span>&nbsp;
              <span>T</span>&nbsp;
              <span>O</span>&nbsp;
            </h1>
          </section>
        </div>
      )}

      <div id="header-container">
        <div className="content">
          <h1>Hi, I'm Riku Sato</h1>
          <span id="element" ref={typedElRef}></span>
          <hr />
          <p>
            I am deeply passionate about technology and its advancements. The ubiquitous presence of computers only serves to intensify my curiosity. I am dedicated, punctual, and value being a dependable team player.
          </p>
          <div className="social_media">
            <div>
              <a href="https://github.com/RikuSato0" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github fa-beat button"></i>
              </a>
            </div>
            <div className="resume-container">
              <a href="/Shivamresume.pdf" target="_blank" rel="noreferrer">
                <div className="resume">
                  <div className="text">Resume</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="__content">
            <div className="front">
              <img src="/image.png" alt="photo" />
            </div>
            <div className="back">
              <h1>HOBBIES</h1>
              <ul>
                <li>Fitness freak</li>
                <br />
                <li>Travelling</li>
                <br />
                <li>Reading</li>
                <br />
                <li>Socializing</li>
                <br />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container reveal" id="about">
        <div className="about-container">
          <div className="about-img">
            <img src="/image.png" alt="photo" />
          </div>
          <div className="about-content">
            <h1>A Bit About Me</h1>
            <br />
            <p>
              I am a highly skilled mobile developer with 5+ years of experience delivering successful solutions for both Android and iOS platforms. My work spans a wide range of applications, from consumer-focused apps to advanced fintech tools. Notably, I designed and developed a high-performing trading bot powered by blockchain technology, which continues to generate strong and consistent profits. My expertise lies in building robust, scalable, and user-friendly applications while leveraging cutting-edge technologies to solve real-world problems. I take pride in turning innovative ideas into impactful products that deliver measurable value.
            </p>
          </div>
        </div>
      </div>

      <section className="wave-container">
        <h1 className="wave">
          <span style={{ '--i': 1 } as React.CSSProperties}>S</span>
          <span style={{ '--i': 2 } as React.CSSProperties}>c</span>
          <span style={{ '--i': 3 } as React.CSSProperties}>r</span>
          <span style={{ '--i': 4 } as React.CSSProperties}>o</span>
          <span style={{ '--i': 5 } as React.CSSProperties}>l</span>
          <span style={{ '--i': 6 } as React.CSSProperties}>l</span>
          <span></span>
          <span style={{ '--i': 7 } as React.CSSProperties}>D</span>
          <span style={{ '--i': 8 } as React.CSSProperties}>o</span>
          <span style={{ '--i': 9 } as React.CSSProperties}>w</span>
          <span style={{ '--i': 10 } as React.CSSProperties}>n</span>
          <br />
          <div className="arrow" onClick={handleArrowClick}>
            <span></span>
            <span></span>
          </div>
        </h1>
      </section>

      <section id="project">
        <div className="container reveal">
          <div className="projects">
            <span className="letter">P</span>
            <span className="letter">r</span>
            <span className="letter">o</span>
            <span className="letter">j</span>
            <span className="letter">e</span>
            <span className="letter">c</span>
            <span className="letter">t</span>
            <span className="letter">s</span>
          </div>

          <div className="text-box">
            <div>
              <a target="_blank" href="https://github.com/ShubhamKhale/labourServices" rel="noreferrer">
                <img
                  src="/labourService_P1.jpg"
                  alt="image"
                  onMouseEnter={(e) => (e.currentTarget.src = '/labourService_about_img.jpg')}
                  onMouseLeave={(e) => (e.currentTarget.src = '/labourService_P1.jpg')}
                />
              </a>
            </div>
            <div className="project-content">
              <h1>Labour Service</h1>
              <p>
                Labour service is a vital component of countless industries and sectors, serving as the backbone of productivity and progress. The Labor Services app <span>connects</span> job seekers to employers. It offers trustworthy and convenient <span>services</span>, allowing users to recruit labourers and provide feedback. Users can provide and access <span>reviews and ratings</span>, helping build a community of trust within the labour services ecosystem.
              </p>
              <div className="project-links">
                <a href="https://github.com/ShubhamKhale/labourServices" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-github fa-beat"></i>
                </a>
                <button className="tags">React Js</button>
                <button className="tags">Typescript</button>
                <button className="tags">Ionic</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container reveal">
          <div className="text-container">
            <div className="text-box">
              <a target="_blank" href="https://github.com/the-shivam-gupta/shopverse" rel="noreferrer">
                <img
                  src="/shopverse1.png"
                  alt="image"
                  onMouseEnter={(e) => (e.currentTarget.src = '/shopverse2.png')}
                  onMouseLeave={(e) => (e.currentTarget.src = '/shopverse1.png')}
                />
              </a>
              <div className="project-content">
                <h1>ShopVerse</h1>
                <p>
                  ShopVerse is a modern and responsive <span>eCommerce website</span> that makes online shopping fast, easy, and enjoyable. It is built with <span>React & Vite</span> for speed and smooth performance, and it uses Firebase for secure login, real-time data updates. The website lets users browse products, add them to a cart, and place orders. It also includes features like <span>personalized user profiles</span>, order history, and responsive design so it works perfectly all devices.
                </p>
                <div className="project-links">
                  <a href="https://github.com/the-shivam-gupta/shopverse" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github fa-beat"></i>
                  </a>
                  <button className="tags">Python</button>
                  <button className="tags">Tkinter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container reveal">
          <div className="text-container">
            <div className="text-box">
              <a target="_blank" href="https://github.com/PriyansuMaurya/MedGuide" rel="noreferrer">
                <img
                  src="/MedGuide_1 Project.png"
                  alt="image"
                  onMouseEnter={(e) => (e.currentTarget.src = '/MedGuide_2 Project.png')}
                  onMouseLeave={(e) => (e.currentTarget.src = '/MedGuide_1 Project.png')}
                />
              </a>
              <div className="project-content">
                <h1>MedGuide</h1>
                <p>
                  Medical diagnosis systems are advanced computer programs that utilize cutting-edge technologies such as <span>machine learning</span> and <span>natural language processing</span> to assist medical practitioners in effectively diagnosing diseases. These innovative systems not only enhance the precision and speed of diagnosis but also offer doctors valuable <span>insights and information</span> to help them make informed decisions regarding patient treatment.
                </p>
                <div className="project-links">
                  <a href="https://github.com/PriyansuMaurya/MedGuide" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github fa-beat"></i>
                  </a>
                  <button className="tags">Python</button>
                  <button className="tags">Flask</button>
                  <button className="tags">Tailwind</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container reveal">
          <div className="text-container">
            <div className="text-box">
              <a target="_blank" href="https://github.com/the-shivam-gupta/HMS" rel="noreferrer">
                <img
                  src="/HSM_P2.jpg"
                  alt="image"
                  onMouseEnter={(e) => (e.currentTarget.src = '/HSM_registration_img.jpg')}
                  onMouseLeave={(e) => (e.currentTarget.src = '/HSM_P2.jpg')}
                />
              </a>
              <div className="project-content">
                <h1>HMS</h1>
                <p>
                  The Hospital Management System is a platform designed to <span>enhance</span> healthcare facilities. This system saves time and improves efficiency by providing healthcare professionals with quick access to <span>patient information</span>, leading to faster diagnoses and treatment. The Hospital Management System benefits <span>both</span> patients and healthcare professionals by improving the quality of care.
                </p>
                <div className="project-links">
                  <a href="https://github.com/the-shivam-gupta/HMS" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github fa-beat"></i>
                  </a>
                  <button className="tags">Python</button>
                  <button className="tags">Tkinter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container reveal">
          <div className="text-container">
            <div className="text-box">
              <a target="_blank" href="https://the-shivam-gupta.github.io/tailwind-clone/" rel="noreferrer">
                <img
                  src="/tailwind-clone-1.png"
                  alt="image"
                  onMouseEnter={(e) => (e.currentTarget.src = '/tailwind-clone-2.png')}
                  onMouseLeave={(e) => (e.currentTarget.src = '/tailwind-clone-1.png')}
                />
              </a>
              <div className="project-content">
                <h1>Tailwind Clone</h1>
                <p>
                  Making a replica of a website named as "<span>Tailwind Clone</span>" to get better at designing the front part of websites. It's a <span>practice</span> project where I'm using Tailwind CSS. The site has only one page and doesn't link to any other pages, it's just for practicing and <span>improving</span> my skills.
                </p>
                <div className="project-links">
                  <a href="https://github.com/the-shivam-gupta/tailwind-clone" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github fa-beat"></i>
                  </a>
                  <button className="tags">HTML</button>
                  <button className="tags">Tailwind</button>
                  <button className="tags">JS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <br />

      <div className="skills-container" id="skills">
        <div className="container reveal">
          <div className="skills">
            <div className="skills-header">
              <span className="letter">S</span>
              <span className="letter">k</span>
              <span className="letter">i</span>
              <span className="letter">l</span>
              <span className="letter">l</span>
              <span className="letter">s</span>
            </div>
            <div className="coding-languages">
              <ul>
                <li>
                  <img src="/html.png" width={80} alt="HTML" />
                  <span>HTML</span>
                </li>
                <li>
                  <img src="/css-3.png" width={80} alt="CSS" />
                  <span>CSS</span>
                </li>
                <li>
                  <img src="/python.png" width={80} alt="PYTHON" />
                  <span>PYTHON</span>
                </li>
                <li>
                  <img src="/mysql.png" width={80} alt="MySQL" />
                  <span>MySQL</span>
                </li>
                <li>
                  <img src="/github.png" width={80} alt="GITHUB" />
                  <span>GITHUB</span>
                </li>
                <li>
                  <img src="/physics.png" width={80} alt="REACTJS" />
                  <span>REACT JS</span>
                </li>
                <li>
                  <img src="/c-.png" width={80} alt="C++" />
                  <span>C++</span>
                </li>
                <li>
                  <img src="/bootstrap.png" width={80} alt="BOOTSTRAP" />
                  <span>BOOTSTRAP</span>
                </li>
                <li>
                  <img src="/javascript.png" width={75} alt="JAVASCRIPT" />
                  <span>JS</span>
                </li>
                <li>
                  <img src="/html.png" width={80} alt="HTML" />
                  <span>HTML</span>
                </li>
                <li>
                  <img src="/css-3.png" width={80} alt="CSS" />
                  <span>CSS</span>
                </li>
                <li>
                  <img src="/python.png" width={80} alt="PYTHON" />
                  <span>PYTHON</span>
                </li>
                <li>
                  <img src="/mysql.png" width={80} alt="MySQL" />
                  <span>MySQL</span>
                </li>
                <li>
                  <img src="/github.png" width={80} alt="GITHUB" />
                  <span>GITHUB</span>
                </li>
                <li>
                  <img src="/physics.png" width={80} alt="REACTJS" />
                  <span>REACT JS</span>
                </li>
                <li>
                  <img src="/c-.png" width={80} alt="C++" />
                  <span>C++</span>
                </li>
                <li>
                  <img src="/bootstrap.png" width={80} alt="BOOTSTRAP" />
                  <span>BOOTSTRAP</span>
                </li>
                <li>
                  <img src="/javascript.png" width={75} alt="JAVASCRIPT" />
                  <span>JS</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-container" id="contact">
        <div className="container reveal">
          <main>
            <div className="title">
              <span className="letter">C</span>
              <span className="letter">o</span>
              <span className="letter">n</span>
              <span className="letter">t</span>
              <span className="letter">a</span>
              <span className="letter">c</span>
              <span className="letter">t</span>
            </div>
            <div
              className="alert"
              style={{ display: alertState.visible ? 'flex' : 'none', backgroundColor: alertState.bg, color: alertState.color }}
            >
              {alertState.text}
            </div>
            <form className="form" id="myForm" autoComplete="off" onSubmit={handleContactSubmit}>
              <div className="input-group">
                <input type="text" name="first_name" id="first-name" placeholder="First name" autoComplete="off" />
                <label htmlFor="first-name">First name</label>
              </div>
              <div className="input-group">
                <input type="text" name="last_name" id="last-name" placeholder="Last Name" autoComplete="off" />
                <label htmlFor="last-name">Last name</label>
              </div>
              <div className="input-group">
                <input type="email" name="e-mail" id="e-mail" placeholder="e-mail" autoComplete="off" />
                <label htmlFor="e-mail">Email</label>
              </div>
              <div className="textarea-group">
                <textarea name="message" id="message" rows={5} placeholder="Message" autoComplete="off"></textarea>
                <label htmlFor="message">Message</label>
              </div>
              <div className="submit-btn">
                <button type="submit" id="showAlert">Send</button>
              </div>
            </form>
          </main>
        </div>
      </div>
      <hr />

      <footer className="footer-container">
        <div className="footer-content">Made with ❤️ by Riku Sato</div>
        <div className="footer-icons">
          <a href="https://github.com/RikuSato0" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github fa-beat-fade"></i>
          </a>
        </div>
      </footer>
    </>
  )
}

export default Portfolio


