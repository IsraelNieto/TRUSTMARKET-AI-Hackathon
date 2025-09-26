import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Home = ({ user }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      img: './assets/images/jitomate.jpg',
      title: 'Transformando el E-commerce Sostenible con IA',
      text: 'Conectamos a consumidores conscientes con productores éticos, usando inteligencia artificial para un futuro más verde y justo.',
    },
    {
      img: './assets/images/hero-banner2.jpg',
      title: 'Impulsamos la sostenibilidad',
      text: 'Conecta con PyMEs y descubre productos ecológicos y éticos.',
    },
    {
      img: './assets/images/hero-banner3.jpg',
      title: 'Marketplace Inteligente',
      text: 'Optimiza tus compras con recomendaciones personalizadas mediante IA.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <>
      <main className="hero" id="inicio">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div key={index} className={`slide ${index === slideIndex ? 'active' : ''}`}>
              <img src={slide.img} alt={`Imagen ${index + 1}`} className="slide-img" />
              <div className="slide-text">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
             
              </div>
            </div>
          ))}
          <button className="prev" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="next" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      </main>
      
      {/* Nuevo banner animado, visible solo para clientes */}
      {user?.role === 'cliente' && (
        <section className="products-banner">
          <div className="banner-slider">
            {slides.map((slide, index) => (
              <div key={index} className={`banner-slide ${index === slideIndex ? 'active' : ''}`}>
                <img src={slide.img} alt={`Imagen ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="banner-content">
            <h2>Explora los productos más sostenibles</h2>
            <Link to="/explore-products" className="banner-btn">
              Ver Productos
            </Link>
          </div>
        </section>
      )}

      <section id="nosotros" className="section">
        <h2>¿Quiénes somos?</h2>
        <p>
          Somos una plataforma dedicada a promover un comercio más justo y sostenible. Utilizamos inteligencia artificial para conectar a pequeños y medianos productores con consumidores que valoran la calidad, la ética y el respeto por el medio ambiente.
        </p>
      </section>

      <section id="soluciones" className="section">
        <h2>Nuestras Soluciones</h2>
        <p>
          Ofrecemos un marketplace inteligente que no solo facilita la compra y venta, sino que también analiza el impacto ambiental y social de cada producto. Nuestra IA te ayuda a tomar decisiones de compra más conscientes, garantizando la trazabilidad y autenticidad de cada artículo.
        </p>
      </section>

      <section id="vendedores" className="section">
        <h2>Para Vendedores</h2>
        <p>
          Si eres un productor o una PyME que comparte nuestros valores de sostenibilidad, TRUSTMARKET AI es tu aliado ideal. Te brindamos herramientas para gestionar tus productos, llegar a un público comprometido y crecer de forma responsable.
        </p>
      </section>

      <section id="contacto" className="section">
        <h2>Contáctanos</h2>
        <p>
          ¿Tienes preguntas, sugerencias o quieres unirte a nuestra red? ¡Estamos listos para escucharte!
        </p>
      </section>
    </>
  );
};

export default Home;