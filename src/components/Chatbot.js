import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Usamos una función asíncrona para poder usar 'await'
    const initChat = async () => {
      try {
        // Esperamos a que el módulo se importe y nos dé sus funciones
        const module = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        const { createChat } = module; // Extraemos la función createChat del módulo

        // Verificamos que no se haya inicializado ya
        if (document.querySelector('#n8n-chat-container .n8n-chat-widget')) {
          return;
        }

        createChat({
          webhookUrl: 'https://israelnr2.app.n8n.cloud/webhook/c9b0cd24-6b2c-4550-8890-2cf48ddb2d87/chat',
          target: '#n8n-chat',
          mode: 'overlay',
          loadPreviousSession: true,
          defaultLanguage: 'es',
          initialMessages: ['🌱 ¡Hola! Soy EcoBot 👋, tu asistente de TRUSTMARKET AI.', '¿En qué puedo asistirte hoy?'],
          i18n: {
            es: {
              title: 'EcoBot - Asistente Virtual',
              subtitle: 'Estamos disponibles 24/7 para ayudarte',
              getStarted: 'Nueva conversación',
              inputPlaceholder: 'Escribe tu mensaje...',
            },
          },
          theme: {
            chatWindow: {
              width: '400px',
              height: '80vh',
              borderRadius: '12px',
              boxShadow: '0px 8px 25px rgba(0,0,0,0.2)',
            },
            header: {
              backgroundColor: '#2c3e50',
              textColor: '#ffffff',
            },
            messages: {
              bot: {
                backgroundColor: '#f4f7f6',
                textColor: '#333333',
              },
              user: {
                backgroundColor: '#1abc9c',
                textColor: '#ffffff',
              },
            },
            launcher: {
              backgroundColor: '#1abc9c',
              iconColor: '#ffffff',
            },
          },
        });
      } catch (error) {
        console.error('❌ Error al cargar el módulo de n8n chat:', error);
      }
    };

    initChat();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <div id='n8n-chat-container'>
      <div id='n8n-chat'></div>
    </div>
  );
};

export default Chatbot;
