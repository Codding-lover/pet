const footerSections = [
  {
    title: "Resources",
    links: [
      { text: "Dog Age Calculator", href: "#calculator" },
      { text: "How It Works", href: "#how-it-works" },
      { text: "Dog Aging Science", href: "#how-it-works" },
      { text: "Breed Information", href: "#calculator" }
    ]
  },
  {
    title: "Articles",
    links: [
      { text: "Dog Health Tips", href: "#featured-articles" },
      { text: "Puppy Care Guide", href: "#featured-articles" },
      { text: "Senior Dog Care", href: "#featured-articles" },
      { text: "Nutrition Guide", href: "#featured-articles" }
    ]
  },
  {
    title: "Support",
    links: [
      { text: "Contact Us", href: "#contact" },
      { text: "Privacy Policy", href: "#privacy" },
      { text: "Terms of Service", href: "#terms" },
      { text: "FAQ", href: "#faq" }
    ]
  }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="text-footer-brand">
              Dog Years Calculator
            </h3>
            <p className="text-gray-400 mb-4">
              The most accurate dog age calculator based on scientific research.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors text-xl"
                data-testid="link-social-paw"
              >
                🐾
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors text-xl"
                data-testid="link-social-email"
              >
                📧
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors text-xl"
                data-testid="link-social-mobile"
              >
                📱
              </a>
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4" data-testid={`text-footer-section-${index}`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                      data-testid={`link-footer-${index}-${linkIndex}`}
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p data-testid="text-copyright">
            © 2025 Dog Years in Human Years Calculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
