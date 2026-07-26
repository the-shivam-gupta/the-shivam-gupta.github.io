export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        Made with ❤️ by <span>Shivam</span>
      </div>
      <div className="footer-icons">
        <a
          href="https://github.com/the-shivam-gupta"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://twitter.com/ShivamGupt97925"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X / Twitter"
        >
          <i className="fa-brands fa-square-x-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/the-shivam-gupta"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a href="mailto:shivamgupta02022002@gmail.com" aria-label="Email">
          <i className="fa-solid fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
}
