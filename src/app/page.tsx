'use client';

import TransitionLink from '@/components/TransitionLink';

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center transition-colors duration-300">
              
        {/* Name Block */}
        <div className="mb-0" style={{
          width: '89.2%',
          height: '390px',
          flexShrink: 0,
          overflow: 'visible'
        }}>
          {/* First Names */}
          <h1 className="font-normal" style={{ 
            fontFamily: 'var(--font-vollkorn), serif',
            fontSize: '95px',
            letterSpacing: '0.14em',
            marginBottom: '-8px',
            whiteSpace: 'nowrap',
            overflow: 'visible',
            textAlign: 'left'
          }}>
            МИХАИЛ БАБКЕНОВИЧ
          </h1>
          
          {/* Last Name */}
          <h2 className="font-normal leading-none" style={{ 
            fontFamily: 'var(--font-vollkorn), serif',
            fontSize: '268px',
            letterSpacing: '0em',
            whiteSpace: 'nowrap',
            overflow: 'visible',
            textAlign: 'left'
          }}>
            ТЕРТЕРЯН
          </h2>
        </div>
        
        {/* Text Block */}
        <div style={{
          textAlign: 'left',
          marginBottom: '4rem',
          marginTop: '2rem',
          width: '100%',
          height: '244px',
          flexShrink: 0,
          overflow: 'visible'
        }}>
          <div className="space-y-4 font-light leading-relaxed" style={{
            fontFamily: 'var(--font-merriweather), serif',
            fontSize: '31px',
            opacity: 1
          }}>
            <p>
              Армянский пианист, композитор и педагог, посвятивший более 40 лет обучению в Московском музыкальном колледже, 
			  где воспитал множество музыкантов. 
            </p>
            <p>
              Его многогранный талант проявился в исполнительстве, 
			  сочинении и глубокой преданности искусству — от романтической классики до авторской музыки с восточным колоритом.
            </p>
          </div>
        </div>

        {/* Buttons Block */}
        <div 
          className="theme-buttons"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '0px',
            gap: '21px',
            width: '100%',
            height: '57px',
            flexShrink: 0
          }}
        >
          <button className="primary-button px-8 py-3 rounded-full transition-all font-medium">
            Слушать музыку
          </button>
          <TransitionLink href="/biography" className="secondary-button px-8 py-3 border rounded-full hover:bg-current/10 transition-all inline-block text-center">
            Узнать больше
          </TransitionLink>
        </div>

      </div>
  );
}
