'use client';

import { biographyContent } from '@/content/biography';

export default function Biography() {
  return (
    <div className="w-full h-full">
      <div className="prose prose-lg max-w-none text-theme">
        {/* Title */}
        <h1 
          className="text-4xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-vollkorn), serif' }}
        >
          {biographyContent.title}
        </h1>

        {/* Sections */}
        {biographyContent.sections.map((section, index) => {
          switch (section.type) {
            case 'paragraph':
              return (
                <p 
                  key={index}
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-merriweather), serif',
                    fontSize: '16px',
                    lineHeight: '1.8'
                  }}
                  dangerouslySetInnerHTML={{ __html: section.content || '' }}
                />
              );
            
            case 'heading':
              const HeadingTag = section.level === 2 ? 'h2' : 'h3';
              return (
                <HeadingTag
                  key={index}
                  className="text-2xl font-semibold mt-8 mb-4"
                  style={{ fontFamily: 'var(--font-vollkorn), serif' }}
                >
                  {section.content}
                </HeadingTag>
              );
            
            case 'works':
              return (
                <div key={index} style={{ marginTop: '2rem' }}>
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-vollkorn), serif' }}
                  >
                    {section.title || 'Works'}
                  </h3>
                  {(section.items || []).map((item, itemIndex) => (
                    <p
                      key={itemIndex}
                      className="mb-2"
                      style={{
                        fontFamily: 'var(--font-merriweather), serif',
                        fontSize: '16px',
                        paddingLeft: '1rem'
                      }}
                    >
                      • {item}
                    </p>
                  ))}
                </div>
              );
            
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
